import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonial from '@/components/Testimonial';
import EmailCTA from '@/components/EmailCTA';
import Footer from '@/components/Footer';
import { getDictionary } from '@/i18n/dictionaries';
import { Locale } from '@/i18n/config';

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return (
    <main className="min-h-screen">
      <Hero dict={dict} lang={params.lang} />
      <Features dict={dict} />
      <Testimonial dict={dict} />
      <EmailCTA dict={dict} lang={params.lang} />
      <Footer dict={dict} lang={params.lang} />
    </main>
  );
}
