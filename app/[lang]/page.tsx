import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonial from '@/components/Testimonial';
import EmailCTA from '@/components/EmailCTA';
import Footer from '@/components/Footer';
import { getDictionary } from '@/i18n/dictionaries';
import { Locale } from '@/i18n/config';

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen">
      <Hero dict={dict} lang={lang} />
      <Features dict={dict} />
      <Testimonial dict={dict} />
      <EmailCTA dict={dict} lang={lang} />
      <Footer dict={dict} lang={lang} />
    </main>
  );
}
