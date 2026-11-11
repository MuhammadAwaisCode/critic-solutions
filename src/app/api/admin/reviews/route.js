import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { supabaseServer } from '../../../../lib/supabase';

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_SECRET_PASSWORD || 'fallback-secret-key-change-in-env'
);

// Helper function to verify admin JWT token from cookies
async function verifyAdminToken(req) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}

// GET: Fetch all reviews for admin dashboard
export async function GET(req) {
  const isAuthorized = await verifyAdminToken(req);
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data: reviews, error } = await supabaseServer
      .from('reviews')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Fetch admin reviews error:', error);
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }

    return NextResponse.json({ reviews });
  } catch (err) {
    console.error('Admin reviews GET error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH: Update review status (approved, rejected, spam, etc.)
export async function PATCH(req) {
  const isAuthorized = await verifyAdminToken(req);
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Review ID and status are required' }, { status: 400 });
    }

    const validStatuses = ['pending', 'approved', 'rejected', 'quarantined', 'spam'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const updateData = { status };
    if (status === 'approved') {
      updateData.published_at = new Date().toISOString();
    }

    const { data: updatedReview, error } = await supabaseServer
      .from('reviews')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update status error:', error);
      return NextResponse.json({ error: 'Failed to update review status' }, { status: 500 });
    }

    return NextResponse.json({ success: true, review: updatedReview });
  } catch (err) {
    console.error('Admin reviews PATCH error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}