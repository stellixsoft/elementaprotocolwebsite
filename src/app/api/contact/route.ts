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
import {
  checkBodySize,
  checkBotSignals,
  checkContactContent,
  checkOrigin,
  checkRateLimits,
  clientIp,
  type GuardRejection,
} from "@/lib/spamGuard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function reject(r: GuardRejection) {
  if (r.silent) {
    // Looks automated: answer like a success so bots learn nothing, but send nothing.
    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 });
  }
  const headers = r.retryAfter ? { "Retry-After": String(r.retryAfter) } : undefined;
  return NextResponse.json({ error: r.error }, { status: r.status, headers });
}

export async function POST(request: Request) {
  try {
    const early = checkOrigin(request) ?? checkBodySize(request);
    if (early) return reject(early);

    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const bot = checkBotSignals(body);
    if (bot) return reject(bot);

    const str = (v: unknown) => (typeof v === "string" ? v : "");
    const name = str(body.name);
    const email = str(body.email);
    const message = str(body.message);
    const subject = str(body.subject);

    if (!name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    if (!isAllowedEmail(email)) {
      return NextResponse.json(
        {
          error: isValidEmailFormat(email.trim())
            ? DISALLOWED_EMAIL_MESSAGE
            : INVALID_EMAIL_MESSAGE,
        },
        { status: 400 },
      );
    }

    const content = checkContactContent({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });
    if (content) return reject(content);

    // Counted only for messages that passed validation, so typos don't use up the allowance.
    const limited = await checkRateLimits([
      { key: `contact:ip:${clientIp(request)}`, limit: 5, windowSec: 10 * 60 },
      { key: `contact:ip-day:${clientIp(request)}`, limit: 20, windowSec: 24 * 60 * 60 },
      { key: `contact:email:${email.trim().toLowerCase()}`, limit: 3, windowSec: 60 * 60 },
    ]);
    if (limited) return reject(limited);

    const smtp = getSmtpConfig();
    if (!smtp.ok) {
      console.error(
        "Contact SMTP config error:",
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

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safeSubject = subject.trim() || "General inquiry";
    const safeMessage = message.trim();

    await transporter.sendMail({
      from: formatFrom(config),
      to: config.to,
      replyTo: `"${safeName}" <${safeEmail}>`,
      subject: `Contact: ${safeSubject}`,
      text: [
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        `Subject: ${safeSubject}`,
        "",
        "Message:",
        safeMessage,
      ].join("\n"),
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #15202f; margin-top: 0;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #24bace;">
            ${escapeHtml(safeMessage).replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: smtpErrorHint(error) },
      { status: 500 },
    );
  }
}
