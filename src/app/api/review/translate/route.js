import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function POST(req) {
  try {
    const { reviewId, targetLang } = await req.json();

    if (!reviewId || !targetLang) {
      return NextResponse.json(
        { error: 'Review ID and Target Language are required' },
        { status: 400 }
      );
    }

    // 1. Check if translation exists in Supabase DB cache
    const { data: cached } = await supabaseServer
      .from('review_translations')
      .select('translated_title, translated_text')
      .eq('review_id', reviewId)
      .eq('target_lang', targetLang)
      .single();

    if (cached) {
      return NextResponse.json({
        success: true,
        cached: true,
        translatedTitle: cached.translated_title,
        translatedText: cached.translated_text,
      });
    }

    // 2. Fetch original approved review from DB
    const { data: review, error: reviewErr } = await supabaseServer
      .from('reviews')
      .select('review_title, review_text, original_lang, status')
      .eq('id', reviewId)
      .eq('status', 'approved')
      .single();

    if (reviewErr || !review) {
      return NextResponse.json(
        { error: 'Approved review not found' },
        { status: 404 }
      );
    }

    // 3. Call Google Translate API
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Translation API key is missing' },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: review.review_text,
          target: targetLang,
          format: 'text',
        }),
      }
    );

    const translateData = await res.json();
    const translatedText =
      translateData?.data?.translations?.[0]?.translatedText || review.review_text;

    // 4. Save result into cache table
    await supabaseServer.from('review_translations').insert([
      {
        review_id: reviewId,
        target_lang: targetLang,
        translated_title: review.review_title,
        translated_text: translatedText,
        provider: 'google',
      },
    ]);

    return NextResponse.json({
      success: true,
      cached: false,
      translatedTitle: review.review_title,
      translatedText: translatedText,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}