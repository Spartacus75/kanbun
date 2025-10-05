'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import JapaneseLanterns from './JapaneseLanterns';
import JapaneseCharacters from './JapaneseCharacters';
import LanguageSwitcher from './LanguageSwitcher';
import { Locale } from '@/i18n/config';

type Dictionary = {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    emailPlaceholder: string;
    ctaButton: string;
    ctaButtonLoading: string;
    successMessage: string;
    errorMessage: string;
    privacyText: string;
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              {dict.hero.badge}
            </motion.div>

            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {dict.hero.title}{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-pink-500">
                  {dict.hero.titleHighlight}
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-pink-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
              {dict.hero.titleEnd && (
                <span className="block mt-2">{dict.hero.titleEnd}</span>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
              {dict.hero.subtitle}
            </p>

            {/* Email capture form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={dict.hero.emailPlaceholder}
                    required
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100 bg-white transition-all disabled:opacity-50 text-lg"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative px-8 py-4 bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 whitespace-nowrap overflow-hidden"
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
                  className={`mt-4 text-sm font-medium ${
                    message.includes('🎉')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {message}
                </motion.p>
              )}

              <p className="mt-4 text-sm text-gray-500">
                {dict.hero.privacyText}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <motion.div
                className="group relative bg-gradient-to-br from-white to-red-50 rounded-2xl p-8 border-2 border-red-200 shadow-[0_4px_20px_rgb(239,68,68,0.1)] hover:shadow-[0_8px_30px_rgb(239,68,68,0.2)] transition-all duration-300"
                whileHover={{ y: -6, scale: 1.03 }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="text-5xl mb-2">
                    ⛩️
                  </div>
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
                  <div className="text-5xl mb-2">
                    🎴
                  </div>
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
                  <div className="text-5xl mb-2">
                    🧩
                  </div>
                  <div className="text-5xl font-bold text-orange-600">
                    {dict.hero.stats.launch}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {dict.hero.stats.launchLabel}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Large JLPT Certificate Illustration */}
              <motion.div
                className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border-4 border-red-200 dark:border-red-800"
                animate={{
                  y: [0, -10, 0],
                  rotate: [-1, 1, -1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Certificate Header */}
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-red-600 mb-2">合格</div>
                  <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300">JLPT</div>
                </div>

                {/* Certificate Body */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/30 rounded-xl">
                    <span className="text-3xl">✍️</span>
                    <div className="flex-1 h-2 bg-red-200 dark:bg-red-800 rounded-full" />
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50 dark:bg-pink-950/30 rounded-xl">
                    <span className="text-3xl">📝</span>
                    <div className="flex-1 h-2 bg-pink-200 dark:bg-pink-800 rounded-full" />
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-xl">
                    <span className="text-3xl">🎧</span>
                    <div className="flex-1 h-2 bg-orange-200 dark:bg-orange-800 rounded-full" />
                  </div>
                </div>

                {/* Stamp */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xl border-4 border-white dark:border-gray-900 shadow-xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.5, type: "spring" }}
                >
                  <span className="transform rotate-12">合格</span>
                </motion.div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                animate={{
                  rotate: [0, 360],
                  y: [0, -10, 0],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                📚
              </motion.div>

              <motion.div
                className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center text-4xl shadow-lg"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                🎯
              </motion.div>

              <motion.div
                className="absolute -top-4 -right-8 w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                🏆
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
