import { getDictionary } from '@/i18n/dictionaries';
import { Locale } from '@/i18n/config';
import Link from 'next/link';

export default async function PrivacyPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={`/${params.lang}`}
            className="inline-flex items-center gap-3 group hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo.png"
              alt="Kanbun"
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-500">
              Kanbun
            </span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {dict.privacy.title}
          </h1>
          <p className="text-xl text-gray-600">
            {dict.privacy.subtitle}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            {dict.privacy.lastUpdated}: {new Date().toLocaleDateString(params.lang === 'fr' ? 'fr-FR' : params.lang === 'zh' ? 'zh-CN' : params.lang === 'ko' ? 'ko-KR' : 'en-US')}
          </p>
        </div>

        {/* Sections */}
        <div className="prose prose-lg max-w-none space-y-10">
          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {dict.privacy.sections.intro.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {dict.privacy.sections.intro.content}
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {dict.privacy.sections.dataCollection.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {dict.privacy.sections.dataCollection.content}
            </p>
          </section>

          {/* Data Use */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {dict.privacy.sections.dataUse.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {dict.privacy.sections.dataUse.content}
            </p>
          </section>

          {/* Data Storage */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {dict.privacy.sections.dataStorage.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {dict.privacy.sections.dataStorage.content}
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {dict.privacy.sections.yourRights.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {dict.privacy.sections.yourRights.content}
            </p>
          </section>

          {/* Contact */}
          <section className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {dict.privacy.sections.contact.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {dict.privacy.sections.contact.content}
            </p>
          </section>
        </div>

        {/* Back button */}
        <div className="mt-16 text-center">
          <Link
            href={`/${params.lang}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {dict.blog.backToHome}
          </Link>
        </div>
      </article>
    </main>
  );
}
