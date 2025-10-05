import type { Metadata } from "next";
import { i18n, type Locale } from '@/i18n/config';
import "../globals.css";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang: locale } = await params;

  const titles: Record<Locale, string> = {
    en: "Kanbun - Master the JLPT with Confidence",
    fr: "Kanbun - Maîtrisez le JLPT avec confiance",
    zh: "Kanbun - 自信掌握 JLPT",
    ko: "Kanbun - 자신감 있게 JLPT 마스터하기"
  };

  const descriptions: Record<Locale, string> = {
    en: "The intelligent learning platform to ace your Japanese exam. Prepare effectively with adaptive quizzes and personalized tracking.",
    fr: "La plateforme d'apprentissage intelligente pour réussir votre examen de japonais. Préparez-vous efficacement avec des quiz adaptatifs et un suivi personnalisé.",
    zh: "智能学习平台，助您顺利通过日语能力考试。通过自适应测验和个性化跟踪高效备考。",
    ko: "일본어 시험을 성공적으로 준비할 수 있는 지능형 학습 플랫폼. 적응형 퀴즈와 맞춤형 추적으로 효율적으로 준비하세요."
  };

  const ogLocales: Record<Locale, string> = {
    en: 'en_US',
    fr: 'fr_FR',
    zh: 'zh_CN',
    ko: 'ko_KR'
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["JLPT", "Japanese", "learning", "quiz", "N5", "N4", "N3", "N2", "N1", "kanji", "vocabulary", "日本語", "일본어", "日语"],
    authors: [{ name: "Kanbun" }],
    creator: "Kanbun",
    publisher: "Kanbun",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://www.kanbun.co'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'fr': '/fr',
        'zh': '/zh',
        'ko': '/ko',
      }
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `https://www.kanbun.co/${locale}`,
      siteName: 'Kanbun',
      locale: ogLocales[locale] || 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Kanbun - JLPT Preparation',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  };
}

export default async function LangLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const lang = params.lang;

  return (
    <html lang={lang}>
      <body className="antialiased">
        {props.children}
      </body>
    </html>
  );
}
