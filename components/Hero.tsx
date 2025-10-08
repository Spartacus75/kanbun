'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import JapaneseLanterns from './JapaneseLanterns';
import JapaneseCharacters from './JapaneseCharacters';
import LanguageSwitcher from './LanguageSwitcher';
import { Locale } from '@/i18n/config';

type Dictionary = {
  hero: {
    badge: string;
    provocativeTitle: string;
    provocativeSubtitle: string;
    problems: string[];
    solution: string;
    emailPlaceholder: string;
    ctaButton: string;
    ctaButtonLoading: string;
    successMessage: string;
    errorMessage: string;
    benefits: string[];
    countdown: {
      launching: string;
      days: string;
      hours: string;
      minutes: string;
    };
    stats: {
      levels: string;
      levelsLabel: string;
      questions: string;
      questionsLabel: string;
      launch: string;
      launchLabel: string;
    };
  };
};

export default function Hero({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  // Countdown to November 2025
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-11-01T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
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
        setMessage(dict.hero.successMessage);
        setEmail('');
      } else {
        setMessage(data.error || dict.hero.errorMessage);
      }
    } catch (error) {
      setMessage(dict.hero.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white sm:bg-gradient-to-br sm:from-white sm:via-red-50/30 sm:to-white">
      {/* Japanese Decorative Elements - Hidden on mobile */}
      <div className="hidden lg:block">
        <JapaneseLanterns />
      </div>
      <JapaneseCharacters />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gradient-to-br from-primary-400/20 to-orange-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Logo */}
      <motion.div
        className="absolute top-4 left-4 sm:top-6 sm:left-1/2 sm:transform sm:-translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <a href={`/${lang}`} className="group flex items-center gap-2 sm:gap-3">
          <motion.div
            whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/logo.png"
              alt="Kanbun Logo"
              width={85}
              height={85}
              quality={100}
              priority
              className="w-[45px] h-[45px] sm:w-[70px] sm:h-[70px] lg:w-[85px] lg:h-[85px]"
            />
          </motion.div>
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-pink-500 group-hover:scale-105 inline-block transition-all duration-300 drop-shadow-lg">
            Kanbun
          </span>
        </a>
      </motion.div>

      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher currentLang={lang} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 z-10">
        <div className="max-w-4xl mx-auto">
          {/* Countdown Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 font-medium">
              <span className="text-2xl">⏰</span>
              <span className="text-lg font-bold">
                {dict.hero.countdown.launching}: {timeLeft.days} {dict.hero.countdown.days} {timeLeft.hours} {dict.hero.countdown.hours}
              </span>
            </div>
          </motion.div>

          {/* Provocative Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-3">
              {dict.hero.provocativeTitle}
            </h1>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600">
              {dict.hero.provocativeSubtitle}
            </p>
          </motion.div>

          {/* Problems List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <ul className="space-y-3">
              {dict.hero.problems.map((problem, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 text-lg sm:text-xl text-gray-700"
                >
                  <span className="text-red-500 font-bold text-2xl">✗</span>
                  <span>{problem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center text-xl sm:text-2xl text-gray-800 font-semibold mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {dict.hero.solution}
          </motion.p>

          {/* Email Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dict.hero.emailPlaceholder}
                required
                disabled={isSubmitting}
                className="flex-1 px-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100 bg-white transition-all disabled:opacity-50 text-lg"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative px-8 py-5 bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 whitespace-nowrap overflow-hidden"
              >
                <span className="relative z-10">
                  {isSubmitting ? dict.hero.ctaButtonLoading : dict.hero.ctaButton}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </form>

            {message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center text-lg font-medium ${
                  message.includes('🎉')
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {message}
              </motion.p>
            )}

            {/* Benefits */}
            <div className="mt-6 space-y-2">
              {dict.hero.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="flex items-center justify-center gap-2 text-gray-700"
                >
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-base sm:text-lg">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
          >
            <motion.div
              className="group relative bg-gradient-to-br from-white to-red-50 rounded-2xl p-8 border-2 border-red-200 shadow-[0_4px_20px_rgb(239,68,68,0.1)] hover:shadow-[0_8px_30px_rgb(239,68,68,0.2)] transition-all duration-300"
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="text-5xl mb-2">⛩️</div>
                <div className="text-5xl font-bold text-red-600">
                  {dict.hero.stats.levels}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {dict.hero.stats.levelsLabel}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 border-2 border-pink-200 shadow-[0_4px_20px_rgb(236,72,153,0.1)] hover:shadow-[0_8px_30px_rgb(236,72,153,0.2)] transition-all duration-300"
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="text-5xl mb-2">🎴</div>
                <div className="text-5xl font-bold text-pink-600">
                  {dict.hero.stats.questions}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {dict.hero.stats.questionsLabel}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative bg-gradient-to-br from-white to-orange-50 rounded-2xl p-8 border-2 border-orange-200 shadow-[0_4px_20px_rgb(249,115,22,0.1)] hover:shadow-[0_8px_30px_rgb(249,115,22,0.2)] transition-all duration-300"
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="text-5xl mb-2">🧩</div>
                <div className="text-5xl font-bold text-orange-600">
                  {dict.hero.stats.launch}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {dict.hero.stats.launchLabel}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
