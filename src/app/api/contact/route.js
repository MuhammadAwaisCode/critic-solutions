import { Resend } from 'resend';

export async function POST(request) {
  try {
    // ── Safe API Key Check ────────────────────────────────────
    if (!process.env.RESEND_API_KEY) {
      console.error('CRITICAL ERROR: RESEND_API_KEY is not defined in .env.local');
      return Response.json(
        { error: 'Email service configuration is missing on the server.' },
        { status: 500 }
      );
    }

    // Initialize Resend safely inside the handler
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const { firstName, lastName, email, message } = body;

    // ── Basic server-side validation ──────────────────────────
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // ── Send email via Resend ─────────────────────────────────
    const { error } = await resend.emails.send({
      from: 'YAE Solutions Contact Form <onboarding@resend.dev>',
      to: ['70153920@student.uol.edu.pk'],
      replyTo: email, 
      subject: `New enquiry from ${firstName} ${lastName}`,
      html: buildEmailHtml({ firstName, lastName, email, message }),
      text: buildEmailText({ firstName, lastName, email, message }),
    });

    if (error) {
      console.error('[Resend error]', error);
      return Response.json(
        { error: 'Failed to send email via Resend service.' },
        { status: 500 }
      );
    }

    return Response.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error('[Contact API error]', err);
    return Response.json(
      { error: 'An unexpected server error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// ── HTML email template ───────────────────────────────────────
function buildEmailHtml({ firstName, lastName, email, message }) {
  const esc = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background:#F7F6F3;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">
          <tr>
            <td style="background:#111110;padding:32px 40px;">
              <p style="margin:0;color:#F7F6F3;font-size:1.25rem;font-weight:700;letter-spacing:-0.01em;">YAE Solutions</p>
              <p style="margin:6px 0 0;color:#8A8A85;font-size:0.875rem;">New contact form submission</p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:1rem;color:#4A4A47;line-height:1.6;">You have received a new message through the YAE Solutions contact form.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F6F3;border-radius:10px;overflow:hidden;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="font-size:0.75rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8A8A85;">Full Name</span><br/>
                          <span style="font-size:0.9375rem;color:#111110;font-weight:600;">${esc(firstName)} ${esc(lastName)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0 6px;border-top:1px solid #E0DFD9;">
                          <span style="font-size:0.75rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8A8A85;">Email Address</span><br/>
                          <a href="mailto:${esc(email)}" style="font-size:0.9375rem;color:#2563EB;font-weight:500;text-decoration:none;">${esc(email)}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 10px;font-size:0.75rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8A8A85;">Message</p>
              <div style="background:#F7F6F3;border-left:3px solid #2563EB;border-radius:0 8px 8px 0;padding:20px 24px;margin-bottom:32px;">
                <p style="margin:0;font-size:0.9375rem;color:#111110;line-height:1.75;white-space:pre-wrap;">${esc(message)}</p>
              </div>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:999px;background:#111110;">
                    <a href="mailto:${esc(email)}" style="display:inline-block;padding:13px 28px;color:#F7F6F3;font-size:0.9375rem;font-weight:600;text-decoration:none;border-radius:999px;">Reply to ${esc(firstName)} →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #E0DFD9;">
              <p style="margin:0;font-size:0.8125rem;color:#8A8A85;">© ${new Date().getFullYear()} YAE Solutions · Lahore, Pakistan</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText({ firstName, lastName, email, message }) {
  return [
    'New contact form submission — YAE Solutions',
    '=============================================',
    '',
    `Name:    ${firstName} ${lastName}`,
    `Email:   ${email}`,
    '',
    'Message:',
    '---------',
    message,
    '',
    `Received: ${new Date().toUTCString()}`,
  ].join('\n');
}