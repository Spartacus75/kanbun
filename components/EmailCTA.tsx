'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Locale } from '@/i18n/config';

interface EmailCTAProps {
  dict: {
    emailCta: {
      title: string;
      subtitle: string;
      emailPlaceholder: string;
      ctaButton: string;
      ctaButtonLoading: string;
      successMessage: string;
      errorMessage: string;
    };
  };
  lang: Locale;
}

export default function EmailCTA({ dict, lang }: EmailCTAProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, language: lang }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(dict.emailCta.successMessage);
        setEmail('');
      } else {
        setMessage(data.error || dict.emailCta.errorMessage);
      }
    } catch (error) {
      setMessage(dict.emailCta.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-red-600 via-red-500 to-pink-500 relative overflow-hidden">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 text-9xl font-bold text-white">勉</div>
        <div className="absolute bottom-10 right-20 text-9xl font-bold text-white">強</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[200px] font-bold text-white">合格</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            {dict.emailCta.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
            {dict.emailCta.subtitle}
          </p>

          {/* Email form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dict.emailCta.emailPlaceholder}
                required
                disabled={isSubmitting}
                className="flex-1 px-6 py-4 sm:py-5 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:border-white focus:outline-none focus:ring-4 focus:ring-white/30 transition-all disabled:opacity-50 text-lg"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 sm:py-5 bg-white text-red-600 font-bold rounded-2xl hover:bg-gray-100 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 whitespace-nowrap shadow-2xl"
              >
                {isSubmitting ? dict.emailCta.ctaButtonLoading : dict.emailCta.ctaButton}
              </button>
            </form>

            {message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 text-lg font-medium ${
                  message.includes('🎉')
                    ? 'text-white'
                    : 'text-red-100'
                }`}
              >
                {message}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
