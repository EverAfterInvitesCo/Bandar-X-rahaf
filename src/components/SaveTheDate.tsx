import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, PlusCircle, Check, Download } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const SaveTheDate: React.FC = () => {
  // Wedding Date: September 25, 2026 at 8:00 PM (20:00) UTC+3 (Jordan Time)
  const targetDate = new Date('2026-09-25T20:00:00+03:00').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isPast: false
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [calendarSaved, setCalendarSaved] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Google Calendar Event Link
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Bandar+%26+Rahaf+Wedding&dates=20260925T170000Z/20260925T230000Z&details=Celebrating+the+wedding+of+Bandar+%26+Rahaf+at+Dead+Sea+Marriott+Resort+%26+Spa,+Jordan.&location=Dead+Sea+Marriott+Resort+%26+Spa,+Jordan`;

  // Download .ics file
  const downloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//EverAfter Invites//Wedding Invite//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-bandar-rahaf-2026@everafterinvites.com',
      'DTSTAMP:20260901T000000Z',
      'DTSTART:20260925T170000Z',
      'DTEND:20260925T230000Z',
      'SUMMARY:Bandar & Rahaf Wedding',
      'DESCRIPTION:Join us to celebrate the wedding of Bandar & Rahaf at the Dead Sea Marriott Resort & Spa, Jordan.',
      'LOCATION:Dead Sea Marriott Resort & Spa, Dead Sea Road, Sweimeh, Jordan',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Bandar_and_Rahaf_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCalendarSaved(true);
    setTimeout(() => setCalendarSaved(false), 4000);
  };

  return (
    <section 
      id="save-the-date-section"
      className="relative py-20 sm:py-28 px-6 overflow-hidden bg-transparent text-center"
    >
      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Section Heading: "Save The Date" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-8"
        >
          <span className="font-cinzel text-xs sm:text-sm tracking-[0.4em] uppercase text-[#BA9267] font-semibold mb-3">
            Celebrate With Us
          </span>
          <h2 className="font-wedding-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#231F20] tracking-wide mb-3">
            Save The Date
          </h2>
          <div className="w-16 h-[1.5px] bg-[#BA9267] mx-auto" />
        </motion.div>

        {/* 
          Typographic Stacked Date Display matching Image 1:
          25/
          09 26
        */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="my-6 flex flex-col items-center select-none"
        >
          <div className="flex flex-col items-center justify-center font-wedding-serif text-[#231F20] leading-none">
            {/* Top row: 25 / */}
            <div className="flex items-baseline justify-center tracking-tight">
              <span className="text-7xl sm:text-8xl md:text-9xl font-light text-[#231F20]">
                25
              </span>
              <span className="text-6xl sm:text-7xl md:text-8xl font-thin text-[#BA9267] ml-1 font-sans italic opacity-85">
                /
              </span>
            </div>

            {/* Bottom row: 09 26 */}
            <div className="flex items-baseline justify-center gap-2 sm:gap-3 -mt-3 sm:-mt-5">
              <span className="text-7xl sm:text-8xl md:text-9xl font-light text-[#231F20]">
                09
              </span>
              <span className="text-4xl sm:text-5xl md:text-6xl font-light text-[#7B6A58] self-end mb-2 sm:mb-3">
                26
              </span>
            </div>
          </div>
        </motion.div>

        {/* Italic Phrase matching Image 1: "We would be delighted to share this wonderful celebration with you on our wedding day." */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl mx-auto my-6 px-4"
        >
          <p className="font-wedding-serif text-lg sm:text-xl md:text-2xl text-[#4A4036] italic leading-relaxed">
            We would be delighted to share this wonderful celebration with you on our wedding day.
          </p>
        </motion.div>

        {/* Elegant Diamond / Line Divider matching Image 1: --- ◆ --- ◆ --- */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="my-8 flex items-center justify-center gap-3 text-[#BA9267] w-full max-w-md"
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#BA9267]/60" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#BA9267]" />
          <div className="w-12 h-[1px] bg-[#BA9267]/60" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#BA9267]" />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#BA9267]/60" />
        </motion.div>

        {/* Live Countdown Grid - Box-less warm palette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10 w-full"
        >
          <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#7B6A58] mb-6 font-semibold">
            Counting down to forever
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl mx-auto">
            
            {/* Days */}
            <div className="flex flex-col items-center py-2">
              <span className="font-wedding-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#231F20]">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#7B6A58] uppercase mt-2">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center py-2">
              <span className="font-wedding-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#231F20]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#7B6A58] uppercase mt-2">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center py-2">
              <span className="font-wedding-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#231F20]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#7B6A58] uppercase mt-2">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center py-2">
              <span className="font-wedding-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#BA9267]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#BA9267] font-semibold uppercase mt-2">
                Seconds
              </span>
            </div>

          </div>
        </motion.div>

        {/* Add to Calendar Action Buttons - Warm Palette */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="add-google-calendar-btn"
            className="px-6 py-3 rounded-full bg-[#231F20] text-white hover:bg-[#3D352F] border border-[#BA9267]/40 transition-all shadow-md hover:shadow-lg font-cinzel text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-[#BA9267]" />
            <span>Google Calendar</span>
          </a>

          <button
            onClick={downloadICS}
            id="download-ics-calendar-btn"
            className="px-6 py-3 rounded-full bg-white/80 text-[#231F20] hover:bg-white border border-[#BA9267]/50 transition-all shadow-2xs hover:shadow-md font-cinzel text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2 cursor-pointer"
          >
            {calendarSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Added to Calendar</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#BA9267]" />
                <span>Apple / Outlook (.ICS)</span>
              </>
            )}
          </button>
        </motion.div>

      </div>
    </section>
  );
};
