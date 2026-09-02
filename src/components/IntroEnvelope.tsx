import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { SkipForward } from 'lucide-react';

interface IntroEnvelopeProps {
  onEnter: () => void;
}

export const IntroEnvelope: React.FC<IntroEnvelopeProps> = ({ onEnter }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .catch((err) => {
          console.warn('Video autoplay notice:', err);
          setTimeout(() => {
            handleComplete();
          }, 2000);
        });
    }
  }, []);

  const handleComplete = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onEnter();
    }, 250);
  };

  const handleVideoEnded = () => {
    handleComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25, ease: 'easeOut' } }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 w-screen h-screen bg-[#241E19] overflow-hidden flex items-center justify-center select-none pointer-events-auto"
      id="intro-envelope-container"
    >
      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={(e) => {
          e.stopPropagation();
          handleComplete();
        }}
        className="absolute top-6 right-6 z-40 px-4 py-2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/25 text-white font-cinzel text-xs tracking-[0.2em] uppercase flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
      >
        <span>Skip</span>
        <SkipForward className="w-3.5 h-3.5" />
      </motion.button>

      {/* Full Frame Watercolor Video Player */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src="/media/watercolor.mp4"
          playsInline
          muted
          autoPlay
          preload="auto"
          onEnded={handleVideoEnded}
          onError={() => {
            setTimeout(handleComplete, 1200);
          }}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </motion.div>
  );
};