import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IntroEnvelope } from './components/IntroEnvelope';
import { HeroSection } from './components/HeroSection';
import { SaveTheDate } from './components/SaveTheDate';
import { VenueSection } from './components/VenueSection';
import { AccommodationSection } from './components/AccommodationSection';
import { RSVPSection } from './components/RSVPSection';
import { OrganizerPortal } from './components/OrganizerPortal';
import { FinalSection } from './components/FinalSection';
import { Footer } from './components/Footer';
import { FloatingNav } from './components/FloatingNav';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showOrganizer, setShowOrganizer] = useState(false);

  const handleEnterInvite = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-[#F6F0E6] text-[#231F20] relative selection:bg-[#BA9267]/25 selection:text-[#231F20]">
      
      {/* Intro Window with flower.png thumbnail & flower.mp4 playback */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroEnvelope onEnter={handleEnterInvite} />
        )}
      </AnimatePresence>

      {/* Main Wedding Scroll Website */}
      <div className={`transition-opacity duration-300 ease-out ${showIntro ? 'opacity-0 pointer-events-none h-0 overflow-hidden' : 'opacity-100'}`}>
        
        {/* Floating Navigation Header & Actions */}
        <FloatingNav 
          onReplayIntro={handleReplayIntro}
          onOpenOrganizer={() => setShowOrganizer(true)}
        />

        {/* 1. Hero Section with background.mp4 & Royal Couple Typography */}
        <HeroSection />

        {/* 
          All Sections After Hero on a Rich Crème / Luxury Beige Canvas
        */}
        <div 
          className="relative bg-[#F6F0E6]"
        >
          {/* 2. Save The Date & Live Countdown Section */}
          <div className="relative z-10">
            <SaveTheDate />
          </div>

          {/* 3. Venue Section: Dead Sea Marriott Resort & Spa beside venue.png (No box, transparent) */}
          <div className="relative z-10">
            <VenueSection />
          </div>

          {/* 4. Accommodation Section with Special Wedding Rates & Booking / Dial info */}
          <div className="relative z-10">
            <AccommodationSection />
          </div>

          {/* 5. RSVP Section with Supabase integration */}
          <div className="relative z-10">
            <RSVPSection onOpenOrganizer={() => setShowOrganizer(true)} />
          </div>

          {/* 6. Final Section: Love story & Special day divider */}
          <div className="relative z-10">
            <FinalSection />
          </div>

          {/* 7. Footer: Made with love by everafterinvites + Socials */}
          <div className="relative z-10">
            <Footer />
          </div>
        </div>

        {/* Organizer Portal Modal & Supabase SQL Schema Viewer */}
        <OrganizerPortal
          isOpen={showOrganizer}
          onClose={() => setShowOrganizer(false)}
        />

      </div>

    </div>
  );
}
