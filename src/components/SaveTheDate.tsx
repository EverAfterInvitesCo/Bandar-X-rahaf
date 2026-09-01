import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Heart, PlusCircle, Check, Download } from 'lucide-react';

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
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Bandar+%26+Rahaf+Wedding&dates=20260925T170000Z/20260925T230000Z&details=Celebrating+the+wedding+of+Bandar+Al+Qatarneh+%26+Rahaf+Abuaisheh+at+Dead+Sea+Marriott+Resort+%26+Spa,+Jordan.&location=Dead+Sea+Marriott+Resort+%26+Spa,+Jordan`;

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
      'DESCRIPTION:Join us to celebrate the wedding of Bandar Al Qatarneh & Rahaf Abuaisheh at the Dead Sea Marriott Resort & Spa, Jordan.',
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
      className="relative py-20 sm:py-28 px-6 overflow-hidden bg-transparent"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-8"
        >
          <span className="font-cinzel text-xs sm:text-sm tracking-[0.4em] uppercase text-[#16397C] font-semibold mb-3">
            Celebrate With Us
          </span>
          <h2 className="font-wedding-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#2C2724] tracking-wide mb-3">
            Save The Date
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto" />
        </motion.div>

        {/* Date & Time Presentation - Box-less typography directly over background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12 py-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-[#C5A059]/40">
            
            {/* Date */}
            <div className="flex flex-col items-center py-2">
              <div className="w-12 h-12 rounded-full bg-[#16397C]/10 flex items-center justify-center text-[#16397C] mb-3">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#7B6A58] mb-1">
                The Date
              </p>
              <p className="font-wedding-serif text-2xl sm:text-3xl font-semibold text-[#16397C]">
                25 September 2026
              </p>
              <p className="font-wedding-sans text-xs tracking-wider text-[#6B5E52] mt-1">
                Friday Evening
              </p>
            </div>

            {/* Time */}
            <div className="flex flex-col items-center py-2 pt-6 md:pt-2">
              <div className="w-12 h-12 rounded-full bg-[#C5A059]/15 flex items-center justify-center text-[#9F762B] mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#7B6A58] mb-1">
                The Time
              </p>
              <p className="font-wedding-serif text-2xl sm:text-3xl font-semibold text-[#2C2724]">
                8:00 PM
              </p>
              <p className="font-wedding-sans text-xs tracking-wider text-[#6B5E52] mt-1">
                Sunset Reception &amp; Dinner
              </p>
            </div>

          </div>
        </motion.div>

        {/* Live Countdown Grid - Box-less numbers directly over background */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#7B6A58] mb-6">
            Counting down to forever
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            
            {/* Days */}
            <div className="flex flex-col items-center py-2">
              <span className="font-wedding-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#16397C] drop-shadow-xs">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#7B6A58] uppercase mt-2">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center py-2">
              <span className="font-wedding-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#2C2724] drop-shadow-xs">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#7B6A58] uppercase mt-2">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center py-2">
              <span className="font-wedding-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#2C2724] drop-shadow-xs">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#7B6A58] uppercase mt-2">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center py-2">
              <span className="font-wedding-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#C5A059] drop-shadow-xs">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#7B6A58] uppercase mt-2">
                Seconds
              </span>
            </div>

          </div>
        </motion.div>

        {/* Add to Calendar Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="add-google-calendar-btn"
            className="px-6 py-3 rounded-full bg-[#16397C] text-white hover:bg-[#0F2857] transition-all shadow-md hover:shadow-lg font-cinzel text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Google Calendar</span>
          </a>

          <button
            onClick={downloadICS}
            id="download-ics-calendar-btn"
            className="px-6 py-3 rounded-full bg-white/90 text-[#2C2724] hover:bg-white border border-[#E8DFC8] transition-all shadow-sm hover:shadow-md font-cinzel text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2 cursor-pointer"
          >
            {calendarSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Added to Calendar</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#9F762B]" />
                <span>Apple / Outlook (.ICS)</span>
              </>
            )}
          </button>
        </motion.div>

      </div>
    </section>
  );
};
