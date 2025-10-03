'use client';

import { motion } from 'framer-motion';

const characters = [
  { char: '勉', top: '15%', left: '8%', delay: 0 },
  { char: '強', top: '25%', right: '12%', delay: 0.5 },
  { char: '合', top: '45%', left: '5%', delay: 1 },
  { char: '格', top: '65%', right: '8%', delay: 1.5 },
  { char: '日', top: '35%', right: '18%', delay: 2 },
  { char: '本', top: '55%', left: '15%', delay: 2.5 },
];

export default function JapaneseCharacters() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {characters.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-6xl sm:text-7xl font-bold text-primary-100 dark:text-primary-900/20 select-none"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
          }}
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          animate={{
            opacity: [0, 0.4, 0.4, 0],
            scale: [0.5, 1, 1, 1.2],
            rotate: [-45, 0, 0, 45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          {item.char}
        </motion.div>
      ))}
    </div>
  );
}
