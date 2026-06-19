import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Message too short").max(2000),
});

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      throw new Error(
        "Email service not configured. Please connect Resend to enable contact form delivery.",
      );
    }

    const html = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0ea5e9;">New message from your portfolio</h2>
        <p><strong>From:</strong> ${escapeHtml(data.name)} &lt;${escapeHtml(data.email)}&gt;</p>
        <p><strong>Message:</strong></p>
        <div style="background:#f8fafc;padding:16px;border-radius:8px;white-space:pre-wrap;">
          ${escapeHtml(data.message)}
        </div>
      </div>
    `;

    const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["Smithstehen07@gmail.com"],
        reply_to: data.email,
        subject: `New portfolio message from ${data.name}`,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Failed to send email (${res.status}): ${body.slice(0, 200)}`);
    }

    return { ok: true };
  });

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
