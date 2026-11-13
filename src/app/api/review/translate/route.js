import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

const LANG_NAMES = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  ur: 'Urdu',
  ar: 'Arabic',
  nl: 'Dutch',
  zh: 'Chinese',
  hi: 'Hindi',
  pt: 'Portuguese',
  it: 'Italian',
  tr: 'Turkish',
};

export async function POST(req) {
  try {
    const { reviewId, targetLang } = await req.json();

    if (!reviewId || !targetLang) {
      return NextResponse.json(
        { error: 'Review ID and Target Language are required' },
        { status: 400 }
      );
    }

    // 1. Check if translation already exists in Supabase DB cache
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

    // 3. Call Groq API (Free Tier) for translation
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY is missing in environment variables' },
        { status: 500 }
      );
    }

    const languageLabel = LANG_NAMES[targetLang] || targetLang;

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `You are a professional translator. Translate the given customer review accurately and naturally into ${languageLabel} (${targetLang}). Preserve the original tone, meaning, and formatting. Respond ONLY with valid JSON in this exact format: {"translatedTitle": string or null, "translatedText": string}.`,
          },
          {
            role: 'user',
            content: JSON.stringify({
              title: review.review_title || null,
              text: review.review_text,
            }),
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.2,
      }),
    });

    const groqData = await res.json();
    if (!res.ok) {
      throw new Error(groqData.error?.message || 'Groq translation API error');
    }

    const raw = groqData.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(raw);

    const translatedTitle = parsed.translatedTitle || review.review_title;
    const translatedText = parsed.translatedText || review.review_text;

    // 4. Save result into Supabase cache table
    await supabaseServer.from('review_translations').insert([
      {
        review_id: reviewId,
        target_lang: targetLang,
        translated_title: translatedTitle,
        translated_text: translatedText,
        provider: 'groq',
      },
    ]);

    return NextResponse.json({
      success: true,
      cached: false,
      translatedTitle,
      translatedText,
    });
  } catch (error) {
    console.error('[Groq Translation Error]', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}