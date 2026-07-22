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

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, designation, rating, message } = body;

    // ── Server-side validation for Review ──────────────────────
    if (!name?.trim() || !message?.trim()) {
      return Response.json(
        { error: 'Name and Review message are required.' },
        { status: 400 }
      );
    }

    // ── 🌍 AUTOMATIC DOMAIN DETECTOR FOR LOGO ──────────────────
    // Public folder se logo.png auto pick kar lega
    const host = request.headers.get('host'); 
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const logoUrl = `${protocol}://${host}/logo.png`; 

    const starsCount = Number(rating) || 5;

    // ── Send email via Resend ─────────────────────────────────
    const { error } = await resend.emails.send({
      from: 'Critics Solution Reviews <onboarding@resend.dev>',
      to: ['criticpickindustries@gmail.com'],
      to: ['70153920@student.uol.edu.pk'],
       // Aapka receiver email
      subject: `⭐ New Web Review from ${name} (${starsCount}/5 Stars)`,
      html: buildReviewEmailHtml({ name, designation, rating: starsCount, message, logoUrl }),
      text: buildReviewEmailText({ name, designation, rating: starsCount, message }),
    });

    if (error) {
      console.error('[Resend Review error]', error);
      return Response.json(
        { error: 'Failed to send review email via Resend service.' },
        { status: 500 }
      );
    }

    return Response.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error('[Review API error]', err);
    return Response.json(
      { error: 'An unexpected server error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// ── HTML Email Template Generator ─────────────────────────────
function buildReviewEmailHtml({ name, designation, rating, message, logoUrl }) {
  const esc = (str) =>
    String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const starsVisual = '⭐'.repeat(rating);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Review Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8FAFC;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.04);border:1px solid #E2E8F0;max-width:600px;width:100%;">
          
          <!-- HEADER WITH LOGO -->
          <tr>
            <td style="background:linear-gradient(135deg, #0F172A 0%, #1E293B 100%);padding:36px 40px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <img src="${logoUrl}" alt="Critics Solution Logo" style="height:48px; max-width:220px; display:block; outline:none; border:none; object-fit:contain;" />
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <h1 style="margin:0;color:#FFFFFF;font-size:1.5rem;font-weight:700;letter-spacing:-0.02em;">Critics Solution</h1>
                    <p style="margin:6px 0 0;color:#94A3B8;font-size:0.875rem;letter-spacing:0.05em;text-transform:uppercase;">Inbound Client Review / Testimonial</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY CONTENT -->
          <tr>
            <td style="padding:40px 40px 32px 40px;">
              <p style="margin:0 0 28px;font-size:1.05rem;color:#334155;line-height:1.6;">
                Hello Team, <br/>You have received a new client review through the official <strong>Critics Solution</strong> testimonial submission form.
              </p>

              <!-- DETAILS TABLE -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border-radius:12px;border:1px solid #E2E8F0;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:16px;">
                          <span style="font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748B;display:block;margin-bottom:4px;">Full Name</span>
                          <span style="font-size:1rem;color:#0F172A;font-weight:600;">${esc(name)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:16px;padding-bottom:16px;border-top:1px solid #E2E8F0;">
                          <span style="font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748B;display:block;margin-bottom:4px;">Designation / Company</span>
                          <span style="font-size:1rem;color:#0F172A;font-weight:600;">${esc(designation) || 'N/A'}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:16px;border-top:1px solid #E2E8F0;">
                          <span style="font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748B;display:block;margin-bottom:4px;">Rating Given</span>
                          <span style="font-size:1.1rem;color:#D97706;font-weight:700;">${starsVisual} (${rating}/5)</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- REVIEW MESSAGE -->
              <span style="font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748B;display:block;margin-bottom:8px;padding-left:4px;">Submitted Review</span>
              <div style="background:#FFFFFF;border-left:4px solid #0F172A;border-radius:0 12px 12px 0;padding:20px 24px;margin-bottom:36px;box-shadow:inset 0 0 0 1px #E2E8F0;">
                <p style="margin:0;font-size:1rem;color:#1E293B;line-height:1.8;white-space:pre-wrap;font-style:italic;">"${esc(message)}"</p>
              </div>

              <!-- ACTION NOTE -->
              <div style="background-color:#EFF6FF; border:1px solid #BFDBFE; border-radius:10px; padding:16px; text-align:center;">
                <p style="margin:0; font-size:0.875rem; color:#1E40AF; font-weight:500;">
                  💡 <strong>Admin Verification Tip:</strong> If you approve this review, copy the text above and add it to your website's testimonials data file to make it live.
                </p>
              </div>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:24px 40px;background-color:#F8FAFC;border-top:1px solid #E2E8F0;text-align:center;">
              <p style="margin:0;font-size:0.8125rem;color:#64748B;line-height:1.5;">
                © ${new Date().getFullYear()} <strong>Critics Solution</strong> · Lahore, Pakistan <br/>
                <span style="font-size:0.75rem;color:#94A3B8;display:block;margin-top:4px;">This is an automated testimonial operational notification.</span>
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

// ── Plain Text Fallback ────────────────────────────────────────
function buildReviewEmailText({ name, designation, rating, message }) {
  return [
    'New Review Submission — Critics Solution',
    '=============================================',
    '',
    `Name:        ${name}`,
    `Designation: ${designation || 'N/A'}`,
    `Rating:      ${rating}/5 Stars`,
    '',
    'Review:',
    '---------',
    message,
    '',
    `Received: ${new Date().toUTCString()}`,
  ].join('\n');
}