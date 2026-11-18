import { NextResponse } from "next/server";
import {
  createMailTransporter,
  escapeHtml,
  formatFrom,
  getSmtpConfig,
  smtpErrorHint,
} from "@/lib/smtp";
import {
  isAllowedEmail,
  isValidEmailFormat,
  DISALLOWED_EMAIL_MESSAGE,
  INVALID_EMAIL_MESSAGE,
} from "@/lib/emailValidation";
import { checkBodySize, checkBotSignals, checkOrigin, checkRateLimits, clientIp } from "@/lib/spamGuard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const early = checkOrigin(request) ?? checkBodySize(request);
    if (early) return NextResponse.json({ error: early.error }, { status: early.status });

    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
    } & Record<string, unknown>;

    if (checkBotSignals(body)) {
      // Automated sign-up: pretend it worked, send nothing.
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const email = typeof body.email === "string" ? body.email.trim() : "";
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!isAllowedEmail(email)) {
      return NextResponse.json(
        {
          error: isValidEmailFormat(email)
            ? DISALLOWED_EMAIL_MESSAGE
            : INVALID_EMAIL_MESSAGE,
        },
        { status: 400 },
      );
    }

    const limited = await checkRateLimits([
      { key: `subscribe:ip:${clientIp(request)}`, limit: 5, windowSec: 60 * 60 },
      { key: `subscribe:email:${email.toLowerCase()}`, limit: 2, windowSec: 24 * 60 * 60 },
    ]);
    if (limited) {
      return NextResponse.json(
        { error: limited.error },
        { status: 429, headers: { "Retry-After": String(limited.retryAfter ?? 60) } },
      );
    }

    const smtp = getSmtpConfig();
    if (!smtp.ok) {
      console.error(
        "Subscribe SMTP config error:",
        smtp.error,
        "(set these in Vercel → Settings → Environment Variables → Production)",
      );
      return NextResponse.json(
        {
          error:
            "Email service is not configured on the server. Add EMAIL_HOST, EMAIL_USER, EMAIL_PASS, and EMAIL_TO in Vercel environment variables, then redeploy.",
        },
        { status: 500 },
      );
    }

    const { config } = smtp;
    const transporter = createMailTransporter(config);

    await transporter.sendMail({
      from: formatFrom(config),
      to: config.to,
      replyTo: email,
      subject: `Subscribe: ${email}`,
      text: [
        "New newsletter / community signup",
        "",
        `Email: ${email}`,
      ].join("\n"),
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #15202f; margin-top: 0;">New Newsletter Signup</h2>
          <p>Someone subscribed from the community section on the website.</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Community subscribe error:", error);
    return NextResponse.json(
      { error: smtpErrorHint(error) },
      { status: 500 },
    );
  }
}
