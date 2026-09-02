import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, CheckCircle2, UserCheck, UserX, UserPlus, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitRSVP } from '../lib/supabase';

interface RSVPSectionProps {
  onOpenOrganizer?: () => void;
}

export const RSVPSection: React.FC<RSVPSectionProps> = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState('');
  const [message, setMessage] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#BA9267', '#C5A059', '#D4AF37', '#FAF7F2', '#E8D5CE', '#231F20']
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    try {
      await submitRSVP({
        full_name: fullName.trim(),
        phone: phone.trim() || undefined,
        attending,
        has_plus_one: attending === 'yes' ? hasPlusOne : false,
        plus_one_name: attending === 'yes' && hasPlusOne ? plusOneName.trim() || undefined : undefined,
        guest_count: attending === 'yes' ? (hasPlusOne ? 2 : 1) : 0,
        message: message.trim() || undefined
      });

      setSubmitted(true);
      if (attending === 'yes') {
        triggerCelebration();
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Something went wrong while saving your RSVP. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFullName('');
    setPhone('');
    setAttending('yes');
    setHasPlusOne(false);
    setPlusOneName('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <section 
      id="rsvp-section"
      className="relative py-20 sm:py-28 px-6 overflow-hidden bg-transparent"
    >
      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="font-cinzel text-xs sm:text-sm tracking-[0.4em] uppercase text-[#BA9267] font-semibold mb-3 inline-block">
            Kindly Respond
          </span>
          <h2 className="font-wedding-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#231F20] tracking-wide mb-4">
            RSVP
          </h2>
          <div className="w-16 h-[1.5px] bg-[#BA9267] mx-auto" />
        </motion.div>

        {/* Box-less RSVP Form directly overlying background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6" id="rsvp-form">
                
                {/* Attendance Toggle */}
                <div className="flex flex-col items-center mb-6">
                  <label className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#7B6A58] font-semibold mb-3">
                    Will you be joining us?
                  </label>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                      type="button"
                      onClick={() => setAttending('yes')}
                      className={`py-3.5 px-4 rounded-full border text-xs sm:text-sm font-cinzel tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        attending === 'yes'
                          ? 'bg-[#231F20] text-white border-[#231F20] shadow-md'
                          : 'bg-white/75 text-[#5C534A] border-[#BA9267]/50 hover:bg-white'
                      }`}
                    >
                      <UserCheck className="w-4 h-4 text-[#BA9267]" />
                      <span>Joyfully Accept</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttending('no')}
                      className={`py-3.5 px-4 rounded-full border text-xs sm:text-sm font-cinzel tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        attending === 'no'
                          ? 'bg-[#7A6A58] text-white border-[#7A6A58] shadow-md'
                          : 'bg-white/75 text-[#5C534A] border-[#BA9267]/50 hover:bg-white'
                      }`}
                    >
                      <UserX className="w-4 h-4" />
                      <span>Regretfully Decline</span>
                    </button>
                  </div>
                </div>

                {/* Guest Full Name */}
                <div>
                  <label htmlFor="rsvp-fullname" className="block font-cinzel text-xs uppercase tracking-wider text-[#231F20] font-semibold mb-2">
                    Full Name <span className="text-[#BA9267]">*</span>
                  </label>
                  <input
                    id="rsvp-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Yousef Al-Majali"
                    className="w-full px-4 py-3.5 rounded-xl border border-[#BA9267]/40 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BA9267]/30 focus:border-[#BA9267] transition-all text-sm text-[#231F20] placeholder:text-[#9E9488] shadow-2xs"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label htmlFor="rsvp-phone" className="block font-cinzel text-xs uppercase tracking-wider text-[#231F20] font-semibold mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="rsvp-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+962 7 9000 0000"
                    className="w-full px-4 py-3.5 rounded-xl border border-[#BA9267]/40 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BA9267]/30 focus:border-[#BA9267] transition-all text-sm text-[#231F20] placeholder:text-[#9E9488] shadow-2xs"
                  />
                </div>

                {/* Plus One (+1) Option (Only if attending) */}
                {attending === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 pt-1"
                  >
                    <div>
                      <label className="block font-cinzel text-xs uppercase tracking-wider text-[#231F20] font-semibold mb-2.5 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#BA9267]" />
                        <span>Will you be bringing a Plus One (+1)?</span>
                      </label>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setHasPlusOne(false)}
                          className={`py-3 px-4 rounded-xl border text-xs font-cinzel tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            !hasPlusOne
                              ? 'bg-[#231F20] text-white border-[#231F20] shadow-sm'
                              : 'bg-white/75 text-[#5C534A] border-[#BA9267]/40 hover:bg-white'
                          }`}
                        >
                          <span>Just Me (1 Guest)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setHasPlusOne(true)}
                          className={`py-3 px-4 rounded-xl border text-xs font-cinzel tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            hasPlusOne
                              ? 'bg-[#BA9267] text-white border-[#BA9267] shadow-sm'
                              : 'bg-white/75 text-[#5C534A] border-[#BA9267]/40 hover:bg-white'
                          }`}
                        >
                          <UserPlus className="w-3.5 h-3.5 text-white" />
                          <span>Yes, +1 Guest</span>
                        </button>
                      </div>
                    </div>

                    {/* Plus One Name Input (if +1 is chosen) */}
                    {hasPlusOne && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-2"
                      >
                        <label htmlFor="rsvp-plusone-name" className="block font-cinzel text-xs uppercase tracking-wider text-[#231F20] font-semibold mb-2">
                          Plus One Full Name <span className="text-[#7B6A58] text-[11px] font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          id="rsvp-plusone-name"
                          type="text"
                          value={plusOneName}
                          onChange={(e) => setPlusOneName(e.target.value)}
                          placeholder="Guest full name"
                          className="w-full px-4 py-3.5 rounded-xl border border-[#BA9267]/40 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BA9267]/30 focus:border-[#BA9267] transition-all text-sm text-[#231F20] placeholder:text-[#9E9488] shadow-2xs"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Congratulatory Note */}
                <div>
                  <label htmlFor="rsvp-message" className="block font-cinzel text-xs uppercase tracking-wider text-[#231F20] font-semibold mb-2 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#BA9267]" />
                    <span>Message / Note to the Bride &amp; Groom</span>
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Leave a heartfelt blessing or wish for Bandar &amp; Rahaf..."
                    className="w-full px-4 py-3.5 rounded-xl border border-[#BA9267]/40 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BA9267]/30 focus:border-[#BA9267] transition-all text-sm text-[#231F20] placeholder:text-[#9E9488] shadow-2xs"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-800 bg-rose-50 p-3 rounded-lg border border-rose-200">
                    {errorMsg}
                  </p>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    id="rsvp-submit-btn"
                    className="w-full py-4 rounded-full bg-[#231F20] text-white hover:bg-[#3D352F] border border-[#231F20]/40 transition-all shadow-md hover:shadow-lg font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending RSVP...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Send Response</span>
                        <Send className="w-4 h-4 text-[#FAF7F2]" />
                      </span>
                    )}
                  </button>
                </div>

              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#231F20] text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-wedding-serif text-3xl sm:text-4xl text-[#231F20]">
                  Thank You, {fullName.split(' ')[0]}!
                </h3>
                <p className="font-wedding-sans text-sm text-[#231F20]/90 max-w-md mx-auto leading-relaxed">
                  {attending === 'yes'
                    ? `Your RSVP ${hasPlusOne ? 'for 2 guests ' : ''}has been joyfully received. We cannot wait to celebrate our unforgettable wedding day with you at the Dead Sea!`
                    : 'We have received your response. You will be warmly missed in our thoughts on our special day.'}
                </p>
                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-full border border-[#231F20]/40 text-[#231F20] bg-[#FAF7F2] hover:bg-white font-cinzel text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Another Response
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
