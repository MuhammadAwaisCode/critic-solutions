import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabaseServer } from '@/lib/supabase';

// Helper for automated OpenAI moderation
async function moderateContent(text) {
  if (!process.env.OPENAI_API_KEY) {
    return { flagged: false, categories: {} };
  }

  try {
    const res = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ input: text }),
    });

    const data = await res.json();
    return data.results?.[0] || { flagged: false, categories: {} };
  } catch (error) {
    console.error('[OpenAI Moderation Error]', error);
    return { flagged: false, error: true };
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, designation, rating, message, email, reviewTitle, originalLang } = body;

    // ── 1. Server-side validation ─────────────────────────────────
    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name and Review message are required.' },
        { status: 400 }
      );
    }

    const starsCount = Number(rating) || 5;
    const reviewerEmail = email?.trim() || 'no-email@criticsolutions.com';

    // ── 2. OpenAI AI Content Screening ────────────────────────────
    const moderationResult = await moderateContent(message);
    const initialStatus = moderationResult.flagged ? 'quarantined' : 'pending';

    // ── 3. Insert into Supabase Database ──────────────────────────
    const { data: newReview, error: dbError } = await supabaseServer
      .from('reviews')
      .insert([
        {
          reviewer_name: name.trim(),
          company_name: designation?.trim() || null,
          reviewer_email: reviewerEmail,
          review_title: reviewTitle?.trim() || null,
          review_text: message.trim(),
          rating: starsCount,
          original_lang: originalLang || 'en',
          status: initialStatus,
          moderation_flags: moderationResult,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error('[Supabase DB Insert Error]', dbError);
      return NextResponse.json(
        { error: 'Failed to save review into database.' },
        { status: 500 }
      );
    }

    // ── 4. Send Email Notification via Resend ──────────────────────
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const host = request.headers.get('host');
      const protocol = request.headers.get('x-forwarded-proto') || 'https';
      const logoUrl = `${protocol}://${host}/logo.png`;

      const targetEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'criticsolutions9@gmail.com';

      await resend.emails.send({
        from: 'Critic Solutions Reviews <onboarding@resend.dev>',
        to: [targetEmail],
        subject: `⭐ New Review from ${name} (${starsCount}/5 Stars) [${initialStatus.toUpperCase()}]`,
        html: buildReviewEmailHtml({ name, designation, rating: starsCount, message, logoUrl, status: initialStatus }),
        text: buildReviewEmailText({ name, designation, rating: starsCount, message }),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Review submitted successfully and queued for admin moderation.',
        id: newReview.id,
      },
      { status: 200 }
    );

  } catch (err) {
    console.error('[Review API error]', err);
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// ── HTML Email Template Generator ─────────────────────────────
function buildReviewEmailHtml({ name, designation, rating, message, logoUrl, status }) {
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
                    <img src="${logoUrl}" alt="Critic Solutions Logo" style="height:48px; max-width:220px; display:block; outline:none; border:none; object-fit:contain;" />
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <h1 style="margin:0;color:#FFFFFF;font-size:1.5rem;font-weight:700;letter-spacing:-0.02em;">Critic Solutions</h1>
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
                Hello Team, <br/>You have received a new client review through the official <strong>Critic Solutions</strong> testimonial submission form.
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
                        <td style="padding-top:16px;padding-bottom:16px;border-top:1px solid #E2E8F0;">
                          <span style="font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748B;display:block;margin-bottom:4px;">Moderation Status</span>
                          <span style="font-size:0.9rem;color:${status === 'quarantined' ? '#DC2626' : '#2563EB'};font-weight:700;text-transform:uppercase;">${status}</span>
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
                  💡 <strong>Admin Action Required:</strong> Log in to your Admin Panel to approve this review and publish it live on the website.
                </p>
              </div>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:24px 40px;background-color:#F8FAFC;border-top:1px solid #E2E8F0;text-align:center;">
              <p style="margin:0;font-size:0.8125rem;color:#64748B;line-height:1.5;">
                © ${new Date().getFullYear()} <strong>Critic Solutions</strong> · Lahore, Pakistan <br/>
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
    'New Review Submission — Critic Solutions',
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