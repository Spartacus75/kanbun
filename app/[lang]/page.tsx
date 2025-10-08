import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonial from '@/components/Testimonial';
import Footer from '@/components/Footer';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import ExitIntentPopup from '@/components/ExitIntentPopup';
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
      <Footer dict={dict} lang={lang} />
      <StickyMobileCTA lang={lang} ctaText={dict.hero.ctaButton} />
      <ExitIntentPopup lang={lang} />
    </main>
  );
}
