'use client';

import { motion } from 'framer-motion';

interface TestimonialProps {
  dict: {
    testimonial: {
      title: string;
      quote: string;
      name: string;
      role: string;
    };
  };
}

export default function Testimonial({ dict }: TestimonialProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-red-50/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-8xl">合</div>
        <div className="absolute bottom-20 right-10 text-8xl">格</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {dict.testimonial.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Quote card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
            {/* Quote icon */}
            <div className="absolute -top-6 left-8 bg-red-600 rounded-full w-12 h-12 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Quote text */}
            <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
              "{dict.testimonial.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {dict.testimonial.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-gray-900 text-lg">
                  {dict.testimonial.name}
                </div>
                <div className="text-gray-600">{dict.testimonial.role}</div>
              </div>
            </div>

            {/* Success badge */}
            <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>N2 合格</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
