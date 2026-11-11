import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: publishedReviews, error } = await supabaseServer
      .from('reviews')
      .select('id, reviewer_name, company_name, review_title, review_text, rating, original_lang, published_at')
      .eq('status', 'approved')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Fetch published reviews error:', error);
      return NextResponse.json({ error: 'Failed to fetch published reviews' }, { status: 500 });
    }

    return NextResponse.json({ reviews: publishedReviews });
  } catch (err) {
    console.error('Published route error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}