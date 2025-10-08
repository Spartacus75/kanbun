'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale } from '@/i18n/config';

interface ExitIntentPopupProps {
  lang: Locale;
}

export default function ExitIntentPopup({ lang }: ExitIntentPopupProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const shown = sessionStorage.getItem('exitIntentShown');
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect when mouse leaves the viewport from the top
      if (e.clientY <= 0 && !hasShown) {
        setShowPopup(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

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
        setMessage('🎉 Spot secured! Check your email.');
        setEmail('');
        setTimeout(() => {
          setShowPopup(false);
        }, 2500);
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
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -50 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-white to-red-50 rounded-3xl p-10 max-w-lg w-full shadow-2xl border-4 border-red-200 relative overflow-hidden"
          >
            {/* Decorative background */}
            <div className="absolute top-0 right-0 text-9xl opacity-5 select-none">🎁</div>

            {/* Close button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-4xl font-light leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              ×
            </button>

            <div className="text-center mb-8">
              <div className="text-6xl mb-4">⏸️</div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Wait! Don't Leave Yet
              </h2>
              <p className="text-xl text-gray-700 font-semibold mb-2">
                Get 20% OFF + Early Access 🎁
              </p>
              <p className="text-lg text-gray-600">
                Limited to the first 100 subscribers
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
                className="w-full px-6 py-5 rounded-2xl border-2 border-red-300 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100 bg-white transition-all disabled:opacity-50 text-lg"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-5 bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white font-bold text-xl rounded-2xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Claiming...' : 'I want 20% OFF 🚀'}
              </button>
            </form>

            {message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 text-center text-lg font-medium ${
                  message.includes('🎉') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {message}
              </motion.p>
            )}

            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="text-green-500 font-bold text-xl">✓</span>
                <span className="text-base">No spam, unsubscribe anytime</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
