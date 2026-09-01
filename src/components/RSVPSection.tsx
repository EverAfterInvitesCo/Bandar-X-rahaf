import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, CheckCircle2, UserCheck, UserX, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitRSVP } from '../lib/supabase';

interface RSVPSectionProps {
  onOpenOrganizer?: () => void;
}

export const RSVPSection: React.FC<RSVPSectionProps> = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [dietary, setDietary] = useState('');
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
        colors: ['#16397C', '#D4AF37', '#FAF7F2', '#E5C378', '#689DF0']
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
        guest_count: attending === 'yes' ? 1 : 0,
        dietary_restrictions: dietary.trim() || undefined,
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
    setDietary('');
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
          <span className="font-cinzel text-xs sm:text-sm tracking-[0.4em] uppercase text-[#16397C] font-semibold mb-3 inline-block">
            Kindly Respond
          </span>
          <h2 className="font-wedding-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#2C2724] tracking-wide mb-4">
            RSVP
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto" />
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
                  <label className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#7B6A58] mb-3">
                    Will you be joining us?
                  </label>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                      type="button"
                      onClick={() => setAttending('yes')}
                      className={`py-3.5 px-4 rounded-full border text-xs sm:text-sm font-cinzel tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        attending === 'yes'
                          ? 'bg-[#16397C] text-white border-[#16397C] shadow-md'
                          : 'bg-white/70 text-[#5C534A] border-[#D4AF37]/50 hover:bg-white'
                      }`}
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Joyfully Accept</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttending('no')}
                      className={`py-3.5 px-4 rounded-full border text-xs sm:text-sm font-cinzel tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        attending === 'no'
                          ? 'bg-[#7A6A58] text-white border-[#7A6A58] shadow-md'
                          : 'bg-white/70 text-[#5C534A] border-[#D4AF37]/50 hover:bg-white'
                      }`}
                    >
                      <UserX className="w-4 h-4" />
                      <span>Regretfully Decline</span>
                    </button>
                  </div>
                </div>

                {/* Guest Full Name */}
                <div>
                  <label htmlFor="rsvp-fullname" className="block font-cinzel text-xs uppercase tracking-wider text-[#2C2724] font-semibold mb-2">
                    Full Name <span className="text-[#16397C]">*</span>
                  </label>
                  <input
                    id="rsvp-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Yousef Al-Majali"
                    className="w-full px-4 py-3.5 rounded-xl border border-[#D4AF37]/50 bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16397C]/30 focus:border-[#16397C] transition-all text-sm text-[#2C2724] placeholder:text-[#9E9488] shadow-2xs"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label htmlFor="rsvp-phone" className="block font-cinzel text-xs uppercase tracking-wider text-[#2C2724] font-semibold mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="rsvp-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+962 7 9000 0000"
                    className="w-full px-4 py-3.5 rounded-xl border border-[#D4AF37]/50 bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16397C]/30 focus:border-[#16397C] transition-all text-sm text-[#2C2724] placeholder:text-[#9E9488] shadow-2xs"
                  />
                </div>

                {/* Dietary Restrictions (Only if attending) */}
                {attending === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 pt-1"
                  >
                    <div>
                      <label htmlFor="rsvp-dietary" className="block font-cinzel text-xs uppercase tracking-wider text-[#2C2724] font-semibold mb-2 flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Dietary Requirements / Allergies</span>
                      </label>
                      <input
                        id="rsvp-dietary"
                        type="text"
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        placeholder="e.g. Vegetarian, Gluten-free, Nut allergy, None"
                        className="w-full px-4 py-3.5 rounded-xl border border-[#D4AF37]/50 bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16397C]/30 focus:border-[#16397C] transition-all text-sm text-[#2C2724] placeholder:text-[#9E9488] shadow-2xs"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Congratulatory Note */}
                <div>
                  <label htmlFor="rsvp-message" className="block font-cinzel text-xs uppercase tracking-wider text-[#2C2724] font-semibold mb-2 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Message / Note to the Bride &amp; Groom</span>
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Leave a heartfelt blessing or wish for Bandar &amp; Rahaf..."
                    className="w-full px-4 py-3.5 rounded-xl border border-[#D4AF37]/50 bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16397C]/30 focus:border-[#16397C] transition-all text-sm text-[#2C2724] placeholder:text-[#9E9488] shadow-2xs"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-700 bg-rose-50 p-3 rounded-lg border border-rose-200">
                    {errorMsg}
                  </p>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    id="rsvp-submit-btn"
                    className="w-full py-4 rounded-full bg-[#16397C] text-white hover:bg-[#0F2857] transition-all shadow-md hover:shadow-lg font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending RSVP...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Send Response</span>
                        <Send className="w-4 h-4" />
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
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-wedding-serif text-3xl sm:text-4xl text-[#2C2724]">
                  Thank You, {fullName.split(' ')[0]}!
                </h3>
                <p className="font-wedding-sans text-sm text-[#5C534A] max-w-md mx-auto leading-relaxed">
                  {attending === 'yes'
                    ? 'Your RSVP has been joyfully received. We cannot wait to celebrate our unforgettable wedding day with you at the Dead Sea!'
                    : 'We have received your response. You will be warmly missed in our thoughts on our special day.'}
                </p>
                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-full border border-[#D4AF37]/50 text-[#5C534A] bg-white/70 hover:bg-white font-cinzel text-xs uppercase tracking-wider transition-colors cursor-pointer"
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
