import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

interface FloatingNavProps {
  onReplayIntro?: () => void;
  onOpenOrganizer: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ onOpenOrganizer }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Floating Mini Header */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: scrolled ? 0 : -80, opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        id="floating-wedding-navbar"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#BA9267]/40 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center gap-4 text-xs font-cinzel tracking-wider text-[#231F20]"
      >
        <span className="font-wedding-serif text-sm font-semibold text-[#BA9267] border-r border-[#BA9267]/30 pr-3 hidden sm:inline">
          B &amp; R
        </span>

        <button 
          onClick={() => scrollToSection('save-the-date-section')}
          className="hover:text-[#BA9267] transition-colors cursor-pointer"
        >
          Date
        </button>

        <button 
          onClick={() => scrollToSection('venue-section')}
          className="hover:text-[#BA9267] transition-colors cursor-pointer"
        >
          Venue
        </button>

        <button 
          onClick={() => scrollToSection('accommodation-section')}
          className="hover:text-[#BA9267] transition-colors cursor-pointer"
        >
          Stay
        </button>

        <button 
          onClick={() => scrollToSection('rsvp-section')}
          className="px-3.5 py-1 rounded-full bg-[#231F20] text-white hover:bg-[#3D352F] border border-[#BA9267]/40 transition-all shadow-xs cursor-pointer font-medium"
        >
          RSVP
        </button>
      </motion.nav>

      {/* Floating Organizer Lockpad Action Button in bottom right */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2">
        <button
          onClick={onOpenOrganizer}
          title="Organizer Portal"
          aria-label="Organizer Portal"
          id="floating-organizer-portal-btn"
          className="w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#231F20] hover:text-[#BA9267] border border-[#BA9267]/40 shadow-md hover:shadow-lg flex items-center justify-center transition-all cursor-pointer hover:scale-105"
        >
          <Lock className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};
