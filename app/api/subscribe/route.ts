import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, language = 'en' } = await request.json();

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Get user agent and IP (optional metadata)
    const userAgent = request.headers.get('user-agent') || undefined;
    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     undefined;

    // Insert into Supabase
    const { data, error } = await supabase
      .from('subscribers')
      .insert([
        {
          email: email.toLowerCase(),
          language,
          user_agent: userAgent,
          ip_address: ipAddress,
        }
      ])
      .select();

    // Handle errors
    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505') { // PostgreSQL unique violation code
        return NextResponse.json(
          { error: 'Cet email est déjà inscrit' },
          { status: 400 }
        );
      }

      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Une erreur est survenue lors de l\'inscription' },
        { status: 500 }
      );
    }

    // Get total subscriber count
    const { count } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true });

    console.log('New subscriber:', email, 'Language:', language);
    console.log('Total subscribers:', count);

    return NextResponse.json(
      {
        success: true,
        message: 'Inscription réussie',
        subscriberCount: count || 0
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}

// GET endpoint to check subscriber count and stats
export async function GET() {
  try {
    // Get total count
    const { count } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true });

    // Get count by language
    const { data: languageStats } = await supabase
      .from('subscribers')
      .select('language')
      .then(async (result) => {
        if (result.data) {
          const stats: Record<string, number> = {};
          result.data.forEach((row: { language: string }) => {
            stats[row.language] = (stats[row.language] || 0) + 1;
          });
          return { data: stats };
        }
        return { data: {} };
      });

    return NextResponse.json({
      total: count || 0,
      byLanguage: languageStats || {},
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Unable to fetch stats' },
      { status: 500 }
    );
  }
}
