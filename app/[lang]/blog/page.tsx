import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import { getDictionary } from '@/i18n/dictionaries';
import { Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);

  const blogTitles: Record<Locale, string> = {
    en: `${dict.blog.title} - Kanbun`,
    fr: `${dict.blog.title} - Kanbun`,
    zh: `${dict.blog.title} - Kanbun`,
    ko: `${dict.blog.title} - Kanbun`
  };

  return {
    title: blogTitles[params.lang],
    description: dict.blog.subtitle,
    openGraph: {
      title: blogTitles[params.lang],
      description: dict.blog.subtitle,
      url: `https://www.kanbun.co/${params.lang}/blog`,
    },
  };
}

export default async function BlogPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <a href={`/${params.lang}`} className="inline-flex items-center gap-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400 hover:opacity-80 transition-opacity">
            <span>←</span> {dict.blog.backToHome}
          </a>
        </div>
      </header>

      {/* Blog content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {dict.blog.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-16">
          {dict.blog.subtitle}
        </p>

        {/* Coming soon message */}
        <div className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-12 text-center border border-primary-100 dark:border-gray-700">
          <div className="text-6xl mb-6">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {dict.blog.comingSoon.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            {dict.blog.comingSoon.description}
          </p>
          <a
            href={`/${params.lang}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all"
          >
            {dict.blog.comingSoon.cta}
          </a>
        </div>
      </div>

      <Footer dict={dict} lang={params.lang} />
    </main>
  );
}
