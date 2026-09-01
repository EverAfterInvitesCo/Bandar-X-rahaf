import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SkipForward } from 'lucide-react';
import envelopeVideo from '../../public/media/envelope.mp4';
import envelopeImg from '../../public/media/envelope.png';

interface IntroEnvelopeProps {
  onEnter: () => void;
}

export const IntroEnvelope: React.FC<IntroEnvelopeProps> = ({ onEnter }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStart = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => {})
        .catch((err) => {
          console.warn('Video playback notice:', err);
          setTimeout(() => {
            handleComplete();
          }, 2000);
        });
    } else {
      setTimeout(() => {
        handleComplete();
      }, 1800);
    }
  };

  const handleComplete = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  const handleVideoEnded = () => {
    handleComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 w-screen h-screen bg-[#FAF7F2] overflow-hidden flex items-center justify-center cursor-pointer select-none"
      id="intro-envelope-container"
      onClick={!isPlaying ? handleStart : undefined}
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

      {/* 1. Full Frame Video Player */}
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <video
          ref={videoRef}
          src={envelopeVideo}
          playsInline
          muted={false}
          autoPlay={false}
          preload="auto"
          onEnded={handleVideoEnded}
          onError={() => {
            if (isPlaying) {
              setTimeout(handleComplete, 1600);
            }
          }}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 2. Static Full Frame envelope image */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <img
              src={envelopeImg}
              alt="Wedding Envelope"
              className="w-full h-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            <div className="absolute inset-x-0 bottom-12 sm:bottom-16 flex justify-center items-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ 
                  opacity: [0.85, 1, 0.85], 
                  y: [0, -5, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2.4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="text-center select-none"
              >
                <p className="font-cinzel font-semibold text-base sm:text-lg md:text-xl tracking-[0.35em] uppercase text-[#16397C] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                  TAP TO ENTER
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};