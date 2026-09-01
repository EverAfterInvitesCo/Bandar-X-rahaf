import React from 'react';
import { motion } from 'motion/react';

export const FinalSection: React.FC = () => {
  return (
    <section 
      id="final-section"
      className="relative py-28 sm:py-36 px-6 text-center overflow-hidden bg-transparent"
    >
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Subtle Decorative Golden Filigree / Flourish */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center justify-center gap-3 text-[#C5A059]"
        >
          <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]" />
          <svg className="w-6 h-6 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2L14 9L21 9L15.5 13.5L17.5 20.5L12 16L6.5 20.5L8.5 13.5L3 9L10 9L12 2Z" fill="currentColor" fillOpacity="0.15" />
          </svg>
          <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]" />
        </motion.div>

        {/* Required Quote: "A love story we’ll tell for a lifetime." */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <h2 className="font-wedding-serif text-3xl sm:text-5xl md:text-6xl text-[#2C2724] font-light tracking-wide leading-tight italic">
            &ldquo;A love story we&rsquo;ll tell for a lifetime.&rdquo;
          </h2>
        </motion.div>

        {/* Fancy Calligraphic Text without any box: "Can't wait to celeberate our special day with you" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="my-10 max-w-2xl px-4"
        >
          <p className="font-wedding-script text-3xl sm:text-5xl md:text-6xl text-[#16397C] leading-relaxed drop-shadow-xs">
            Can&rsquo;t wait to celeberate our special day with you
          </p>
        </motion.div>

        {/* Delicate Golden Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mb-8"
        />

        {/* Couple Sign-off */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-2"
        >
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.4em] text-[#7B6A58] uppercase font-light">
            With All Our Love
          </p>
          <p className="font-wedding-serif text-3xl sm:text-4xl md:text-5xl text-[#16397C] font-normal tracking-wide">
            Bandar &amp; Rahaf
          </p>
        </motion.div>

      </div>
    </section>
  );
};
