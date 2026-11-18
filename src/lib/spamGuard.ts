/**
 * Spam protection for the public form endpoints (contact, community sign-up).
 *
 * Layers, cheapest first:
 *  1. Origin check: browsers send an Origin header; posts from other sites are refused.
 *  2. Body size cap, so nobody can stream megabytes into the handler.
 *  3. Honeypot: a hidden field real visitors never see. If it is filled, the request is a bot;
 *     we answer "success" so the bot learns nothing, and send nothing.
 *  4. Time trap: the form records when it was shown. Humans need a few seconds to type;
 *     submissions faster than that are refused.
 *  5. Content rules: length limits, no line breaks in single-line fields (header injection),
 *     and a cap on links in the message.
 *  6. Rate limits per IP address and per email address.
 *
 * Rate limits use Upstash Redis when UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set
 * (shared across all Vercel instances). Without them they fall back to memory, which still stops
 * bursts against a single instance but is not shared between instances.
 */

export type GuardRejection = {
  status: number;
  error: string;
  /** Seconds until the caller may try again (rate limits only). */
  retryAfter?: number;
  /** True when the request looks automated and should get a fake success. */
  silent?: boolean;
};

const ALLOWED_HOSTS = [
  "elementaprotocol.com",
  "www.elementaprotocol.com",
  "localhost",
  "127.0.0.1",
];

export const HONEYPOT_FIELD = "company_website";
export const STARTED_AT_FIELD = "form_started_at";

const MIN_FILL_MS = 3_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
export const MAX_BODY_BYTES = 20_000;

/** Origin must be this site (or a Vercel preview of it). Missing Origin is allowed (same-origin GET-less clients). */
export function checkOrigin(request: Request): GuardRejection | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  let host: string;
  try {
    host = new URL(origin).hostname.toLowerCase();
  } catch {
    return { status: 403, error: "Request not allowed." };
  }
  const ownHost = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const allowed =
    host === ownHost ||
    ALLOWED_HOSTS.includes(host) ||
    (host.endsWith(".vercel.app") && host.includes("elementaprotocolwebsite"));
  return allowed ? null : { status: 403, error: "Request not allowed." };
}

export function checkBodySize(request: Request): GuardRejection | null {
  const len = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(len) && len > MAX_BODY_BYTES) {
    return { status: 413, error: "Your message is too long." };
  }
  return null;
}

/** Honeypot and time trap. Both answer with a silent fake success. */
export function checkBotSignals(body: Record<string, unknown>, now = Date.now()): GuardRejection | null {
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: 200, error: "", silent: true };
  }
  const startedAt = Number(body[STARTED_AT_FIELD]);
  if (Number.isFinite(startedAt) && startedAt > 0) {
    const elapsed = now - startedAt;
    if (elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS) {
      return { status: 200, error: "", silent: true };
    }
  }
  return null;
}

const LINK_PATTERN = /(https?:\/\/|www\.)\S+/gi;

export function checkContactContent(fields: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): GuardRejection | null {
  const { name, email, subject, message } = fields;
  if (/[\r\n]/.test(name) || /[\r\n]/.test(subject) || /[\r\n]/.test(email)) {
    return { status: 400, error: "Name, email and subject must be on one line." };
  }
  if (name.length > 100) return { status: 400, error: "Name must be 100 characters or fewer." };
  if (email.length > 254) return { status: 400, error: "Email address is too long." };
  if (subject.length > 150) return { status: 400, error: "Subject must be 150 characters or fewer." };
  if (message.length < 10) return { status: 400, error: "Please write a little more (at least 10 characters)." };
  if (message.length > 5000) return { status: 400, error: "Message must be 5,000 characters or fewer." };
  const links = message.match(LINK_PATTERN)?.length ?? 0;
  if (links > 3) return { status: 400, error: "Please include no more than 3 links." };
  return null;
}

/** Best client IP Vercel gives us. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

// MARK: Rate limiting

type Bucket = { count: number; resetAt: number };
const memoryBuckets = new Map<string, Bucket>();

function memoryHit(key: string, windowSec: number, now: number): Bucket {
  const existing = memoryBuckets.get(key);
  if (!existing || existing.resetAt <= now) {
    const fresh = { count: 1, resetAt: now + windowSec * 1000 };
    memoryBuckets.set(key, fresh);
    if (memoryBuckets.size > 5_000) {
      for (const [k, b] of memoryBuckets) if (b.resetAt <= now) memoryBuckets.delete(k);
    }
    return fresh;
  }
  existing.count += 1;
  return existing;
}

async function upstashHit(key: string, windowSec: number, now: number): Promise<Bucket | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(windowSec), "NX"],
        ["PTTL", key],
      ]),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: number }[];
    const count = Number(data?.[0]?.result ?? 0);
    const pttl = Number(data?.[2]?.result ?? windowSec * 1000);
    return { count, resetAt: now + (pttl > 0 ? pttl : windowSec * 1000) };
  } catch {
    return null; // Redis trouble must never block real visitors; fall back to memory.
  }
}

export type RateRule = { key: string; limit: number; windowSec: number };

/** Counts one hit against every rule and refuses if any is over its limit. */
export async function checkRateLimits(rules: RateRule[], now = Date.now()): Promise<GuardRejection | null> {
  for (const rule of rules) {
    const bucket = (await upstashHit(rule.key, rule.windowSec, now)) ?? memoryHit(rule.key, rule.windowSec, now);
    if (bucket.count > rule.limit) {
      const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
      return {
        status: 429,
        error: "Too many messages from you in a short time. Please try again later.",
        retryAfter,
      };
    }
  }
  return null;
}
