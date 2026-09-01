import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Attempt auto-play with looping enabled (always muted)
    if (videoRef.current) {
      videoRef.current.play().catch((e) => {
        console.warn('Hero video autoplay notice:', e);
      });
    }
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById('save-the-date-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero-section"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#241E19]"
    >
      {/* Background Video (`background.mp4`) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/media/background.mp4"
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover object-center scale-105"
        />

        {/* Fallback Sunset Beach Atmosphere if video is not yet placed in media folder */}
        {videoError && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'radial-gradient(ellipse at 50% 30%, #5E412F 0%, #301E17 50%, #1A110D 100%)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-black/70" />
          </div>
        )}

        {/* Elegant Cinematic Overlay Gradients for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
      </div>

      {/* Main Overlay Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center text-white flex flex-col items-center">
        
        {/* Text 1: Together with their families */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-cinzel text-xs sm:text-sm md:text-base tracking-[0.35em] text-[#E8DFC8] uppercase font-light mb-4 drop-shadow-md"
        >
          Together with their familes ,
        </motion.p>

        {/* Text 2: Bandar Al Qatarneh & Rahaf Abuaisheh */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="my-3 sm:my-5"
        >
          <h1 className="font-wedding-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wide text-[#FAF7F2] drop-shadow-lg leading-[1.15]">
            Bandar Al Qatarneh
          </h1>
          
          <div className="my-2 sm:my-3">
            <span className="font-wedding-script text-4xl sm:text-5xl md:text-6xl text-[#E5C378] inline-block px-4">
              &amp;
            </span>
          </div>

          <h1 className="font-wedding-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wide text-[#FAF7F2] drop-shadow-lg leading-[1.15]">
            Rahaf Abuaisheh
          </h1>
        </motion.div>

        {/* Text 3: Invite you to their wedding */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-cinzel text-xs sm:text-sm md:text-base tracking-[0.3em] text-[#E3D9C3] uppercase mt-4 mb-2 font-light drop-shadow-md"
        >
          Invite you to their wedding
        </motion.p>

      </div>

      {/* Subtle Scroll Down Cue */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ 
          opacity: { delay: 1.2, duration: 0.8 },
          y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
        }}
        id="hero-scroll-cue"
        aria-label="Scroll down to Save The Date"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-[#E8DFC8]/80 hover:text-white transition-colors cursor-pointer"
      >
        <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-[#E5C378]" />
      </motion.button>
    </section>
  );
};