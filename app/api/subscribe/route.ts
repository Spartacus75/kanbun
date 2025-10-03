import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for demo (replace with database in production)
const subscribers = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

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

    // Check if already subscribed
    if (subscribers.has(email.toLowerCase())) {
      return NextResponse.json(
        { error: 'Cet email est déjà inscrit' },
        { status: 400 }
      );
    }

    // Add to subscribers
    subscribers.add(email.toLowerCase());

    // Log for now (replace with database save)
    console.log('New subscriber:', email);
    console.log('Total subscribers:', subscribers.size);

    // Option 1: Use Web3Forms (simple, no backend needed)
    // Uncomment and add your Web3Forms access key in .env.local
    /*
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          subject: 'New Kanbun Subscriber',
          from_name: 'Kanbun Landing',
          email: email,
          message: `New subscriber: ${email}`,
        }),
      });

      if (!web3FormsResponse.ok) {
        console.error('Web3Forms error');
      }
    }
    */

    // Option 2: Use Resend (better for actual email campaigns)
    // Uncomment and install resend: npm install resend
    /*
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Kanbun <onboarding@kanbun.co>',
        to: email,
        subject: 'Bienvenue sur la liste d\'attente Kanbun !',
        html: `
          <h1>Merci de rejoindre Kanbun !</h1>
          <p>Vous êtes maintenant inscrit sur notre liste d'attente.</p>
          <p>Nous vous tiendrons informé du lancement de la plateforme.</p>
          <p>À bientôt ! 🇯🇵</p>
        `,
      });
    }
    */

    return NextResponse.json(
      {
        success: true,
        message: 'Inscription réussie',
        subscriberCount: subscribers.size
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

// Optional: GET endpoint to check subscriber count (protect this in production!)
export async function GET() {
  return NextResponse.json({
    count: subscribers.size,
  });
}
