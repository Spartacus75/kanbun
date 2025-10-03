'use client';

import { motion } from 'framer-motion';

export default function JapaneseLanterns() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Lantern 1 */}
      <motion.div
        className="absolute top-20 right-[10%]"
        animate={{
          y: [0, -20, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
          <ellipse cx="30" cy="8" rx="3" ry="8" fill="#DC2626" opacity="0.3"/>
          <rect x="15" y="15" width="30" height="40" rx="15" fill="#EF4444" opacity="0.8"/>
          <line x1="20" y1="25" x2="40" y2="25" stroke="#FCA5A5" strokeWidth="1.5"/>
          <line x1="20" y1="35" x2="40" y2="35" stroke="#FCA5A5" strokeWidth="1.5"/>
          <line x1="20" y1="45" x2="40" y2="45" stroke="#FCA5A5" strokeWidth="1.5"/>
          <ellipse cx="30" cy="57" rx="4" ry="3" fill="#991B1B"/>
          <line x1="30" y1="60" x2="30" y2="75" stroke="#DC2626" strokeWidth="2"/>
          <circle cx="30" cy="75" r="3" fill="#FCA5A5"/>
        </svg>
      </motion.div>

      {/* Lantern 2 */}
      <motion.div
        className="absolute top-40 left-[15%]"
        animate={{
          y: [0, 15, 0],
          rotate: [2, -2, 2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <svg width="50" height="70" viewBox="0 0 50 70" fill="none">
          <ellipse cx="25" cy="6" rx="2.5" ry="6" fill="#DC2626" opacity="0.3"/>
          <rect x="12" y="12" width="26" height="35" rx="13" fill="#EF4444" opacity="0.7"/>
          <line x1="17" y1="20" x2="33" y2="20" stroke="#FCA5A5" strokeWidth="1.2"/>
          <line x1="17" y1="28" x2="33" y2="28" stroke="#FCA5A5" strokeWidth="1.2"/>
          <line x1="17" y1="36" x2="33" y2="36" stroke="#FCA5A5" strokeWidth="1.2"/>
          <ellipse cx="25" cy="48" rx="3.5" ry="2.5" fill="#991B1B"/>
          <line x1="25" y1="50" x2="25" y2="63" stroke="#DC2626" strokeWidth="1.8"/>
          <circle cx="25" cy="63" r="2.5" fill="#FCA5A5"/>
        </svg>
      </motion.div>

      {/* Lantern 3 */}
      <motion.div
        className="absolute top-60 right-[20%]"
        animate={{
          y: [0, -18, 0],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <svg width="45" height="65" viewBox="0 0 45 65" fill="none">
          <ellipse cx="22.5" cy="5" rx="2" ry="5" fill="#DC2626" opacity="0.3"/>
          <rect x="10" y="10" width="25" height="33" rx="12.5" fill="#EF4444" opacity="0.6"/>
          <line x1="15" y1="18" x2="30" y2="18" stroke="#FCA5A5" strokeWidth="1"/>
          <line x1="15" y1="25" x2="30" y2="25" stroke="#FCA5A5" strokeWidth="1"/>
          <line x1="15" y1="32" x2="30" y2="32" stroke="#FCA5A5" strokeWidth="1"/>
          <ellipse cx="22.5" cy="44" rx="3" ry="2" fill="#991B1B"/>
          <line x1="22.5" y1="46" x2="22.5" y2="58" stroke="#DC2626" strokeWidth="1.5"/>
          <circle cx="22.5" cy="58" r="2" fill="#FCA5A5"/>
        </svg>
      </motion.div>
    </div>
  );
}
