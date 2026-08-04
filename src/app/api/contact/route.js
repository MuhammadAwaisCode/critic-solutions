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

    const host = request.headers.get('host'); 
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const logoUrl = `${protocol}://${host}/logo.png`;

    // ── Send email via Resend ─────────────────────────────────
    const { error } = await resend.emails.send({
      from: 'Critic Solutions Contact Form <onboarding@resend.dev>',
       to: ['criticsolutions9@gmail.com'],
     
      replyTo: email, 
      subject: ` New enquiry from ${firstName} ${lastName}`,
      html: buildEmailHtml({ firstName, lastName, email, message, logoUrl }), // Passed logoUrl here
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
function buildEmailHtml({ firstName, lastName, email, message, logoUrl }) {
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
  <title>New Contact Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8FAFC;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.04);border:1px solid #E2E8F0;max-width:600px;width:100%;">
          <tr>
            <td style="background:linear-gradient(135deg, #0F172A 0%, #1E293B 100%);padding:36px 40px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <img src="${logoUrl}" alt="Critic Solutions Logo" style="height:48px; max-width:220px; display:block; outline:none; border:none; object-fit:contain;" />
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <h1 style="margin:0;color:#FFFFFF;font-size:1.5rem;font-weight:700;letter-spacing:-0.02em;">Critic Solutions</h1>
                    <p style="margin:6px 0 0;color:#94A3B8;font-size:0.875rem;letter-spacing:0.05em;text-transform:uppercase;">Inbound Client Inquiry</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 40px 32px 40px;">
              <p style="margin:0 0 28px;font-size:1.05rem;color:#334155;line-height:1.6;">
                Hello Team, <br/>You have received a professional message through the official <strong>Critic Solutions</strong> portal. Details are provided below:
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border-radius:12px;border:1px solid #E2E8F0;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:16px;">
                          <span style="font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748B;display:block;margin-bottom:4px;">Full Name</span>
                          <span style="font-size:1rem;color:#0F172A;font-weight:600;">${esc(firstName)} ${esc(lastName)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:16px;border-top:1px solid #E2E8F0;">
                          <span style="font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748B;display:block;margin-bottom:4px;">Email Address</span>
                          <a href="mailto:${esc(email)}" style="font-size:1rem;color:#2563EB;font-weight:600;text-decoration:none;">${esc(email)}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <span style="font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748B;display:block;margin-bottom:8px;padding-left:4px;">Client Message</span>
              <div style="background:#FFFFFF;border-left:4px solid #0F172A;border-radius:0 12px 12px 0;padding:20px 24px;margin-bottom:36px;box-shadow:inset 0 0 0 1px #E2E8F0;">
                <p style="margin:0;font-size:1rem;color:#1E293B;line-height:1.8;white-space:pre-wrap;font-style:italic;">"${esc(message)}"</p>
              </div>
              
              <!-- Quick Action Button -->
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="mailto:${esc(email)}" style="display:inline-block;padding:14px 32px;background:#0F172A;color:#FFFFFF;font-size:0.9375rem;font-weight:600;text-decoration:none;border-radius:10px;box-shadow:0 4px 12px rgba(15,23,42,0.15);transition:background 0.2s;">Reply to Lead →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;background-color:#F8FAFC;border-top:1px solid #E2E8F0;text-align:center;">
              <p style="margin:0;font-size:0.8125rem;color:#64748B;line-height:1.5;">
                © ${new Date().getFullYear()} <strong>Critic Solutions</strong> · Lahore, Pakistan <br/>
                <span style="font-size:0.75rem;color:#94A3B8;display:block;margin-top:4px;">This is an automated operational node notification.</span>
              </p>
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
    'New Contact Inquiry — Critic Solutions',
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
