'use client';

import { motion } from 'framer-motion';

type Dictionary = {
  features: {
    title: string;
    subtitle: string;
    list: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    problemSolution: {
      title: string;
      problemTitle: string;
      problems: string[];
      solutionTitle: string;
      solutions: string[];
    };
  };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Features({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-red-200/20 dark:bg-red-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-200/20 dark:bg-pink-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-600 dark:text-red-400 text-sm font-semibold mb-4">
              Features
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {dict.features.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {dict.features.subtitle}
          </motion.p>
        </div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24"
        >
          {dict.features.list.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-800 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-2">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/0 to-pink-500/0 group-hover:from-red-500/5 group-hover:to-pink-500/5 transition-all duration-300" />

                {/* Icon container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    {feature.icon}
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 to-pink-400 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <h3 className="relative text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Problem/Solution section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-pink-500 rounded-[2.5rem] p-12 sm:p-16 lg:p-20 text-white overflow-hidden shadow-2xl">
            {/* Decorative patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>

            {/* Floating Japanese characters */}
            <div className="absolute top-10 right-10 text-9xl font-bold text-white/5 select-none">日</div>
            <div className="absolute bottom-10 left-10 text-9xl font-bold text-white/5 select-none">本</div>

            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center leading-tight"
              >
                {dict.features.problemSolution.title}
              </motion.h3>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                  <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-4xl">{dict.features.problemSolution.problemTitle.split(' ')[0]}</span>
                    <span>{dict.features.problemSolution.problemTitle.split(' ').slice(1).join(' ')}</span>
                  </h4>
                  <ul className="space-y-4">
                    {dict.features.problemSolution.problems.map((problem, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-3 text-white/90 text-lg"
                      >
                        <span className="text-red-200 mt-1">✗</span>
                        <span>{problem}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                  <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-4xl">{dict.features.problemSolution.solutionTitle.split(' ')[0]}</span>
                    <span>{dict.features.problemSolution.solutionTitle.split(' ').slice(1).join(' ')}</span>
                  </h4>
                  <ul className="space-y-4">
                    {dict.features.problemSolution.solutions.map((solution, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-3 text-white/90 text-lg"
                      >
                        <span className="text-green-300 mt-1">✓</span>
                        <span>{solution}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
