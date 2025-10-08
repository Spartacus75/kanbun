'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale } from '@/i18n/config';

interface StickyCTAProps {
  lang: Locale;
  ctaText: string;
}

export default function StickyMobileCTA({ lang, ctaText }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        setMessage('🎉 Spot secured!');
        setEmail('');
        setTimeout(() => {
          setShowModal(false);
          setMessage('');
        }, 2000);
      } else {
        setMessage(data.error || 'Error. Please try again.');
      }
    } catch (error) {
      setMessage('Error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Sticky Button - Mobile Only */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowModal(true)}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 lg:hidden px-8 py-4 bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white font-bold text-lg rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>{ctaText}</span>
            <span className="text-2xl">🚀</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Claim Your Spot! 🎯
                </h3>
                <p className="text-gray-600">
                  Get 20% OFF (first 100 only)
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100 bg-white transition-all disabled:opacity-50 text-lg"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white font-bold text-lg rounded-2xl hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Joining...' : 'I want 20% OFF 🚀'}
                </button>
              </form>

              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-center font-medium ${
                    message.includes('🎉') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {message}
                </motion.p>
              )}

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
