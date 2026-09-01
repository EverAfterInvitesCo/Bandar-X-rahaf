import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ExternalLink, Compass } from 'lucide-react';

export const VenueSection: React.FC = () => {
  const mapAddress = "Dead Sea Marriott Resort & Spa, Dead Sea Road, Sweimeh, Jordan";
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Dead+Sea+Marriott+Resort+%26+Spa+Jordan";
  // Responsive embed URL for Dead Sea Marriott Resort & Spa
  const mapEmbedUrl = "https://maps.google.com/maps?q=Dead%20Sea%20Marriott%20Resort%20%26%20Spa%20Jordan&t=&z=14&ie=UTF8&iwloc=&output=embed";

  return (
    <section 
      id="venue-section"
      className="relative py-20 sm:py-28 px-6 overflow-hidden bg-transparent"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="font-cinzel text-xs sm:text-sm tracking-[0.4em] uppercase text-[#16397C] font-semibold mb-3 inline-block">
            The Location
          </span>
          <h2 className="font-wedding-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#2C2724] tracking-wide mb-3">
            Dead Sea Marriott Resort &amp; Spa
          </h2>
          <p className="font-wedding-script text-3xl sm:text-4xl text-[#C5A059] mb-4">
            Jordan
          </p>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto" />
        </motion.div>

        {/* Hand-drawn Venue Illustration (venue.png) - Clean Transparent Floating Layout with NO Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full flex justify-center mb-10 sm:mb-14"
        >
          {/* Note: Completely transparent background without any enclosing box container */}
          <div className="relative w-full max-w-4xl px-2">
            <img
              src="/media/venue.png"
              alt="Dead Sea Marriott Resort & Spa Architectural Sketch"
              className="w-full h-auto object-contain max-h-[380px] sm:max-h-[460px] mx-auto filter drop-shadow-sm select-none"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.indexOf('/venue.png') === -1) {
                  target.src = '/venue.png';
                }
              }}
            />
          </div>
        </motion.div>

        {/* Details & Google Maps Side-by-Side (Seamlessly integrated, transparent layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Venue Narrative & Coordinates (No box) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-[#16397C]">
                <MapPin className="w-5 h-5 text-[#16397C]" />
                <span className="font-cinzel text-xs uppercase tracking-[0.25em] font-semibold">
                  Sweimeh, Dead Sea Road
                </span>
              </div>
              <h3 className="font-wedding-serif text-2xl sm:text-3xl text-[#2C2724] font-normal leading-snug">
                Where the turquoise waters meet timeless desert horizons
              </h3>
              <p className="font-wedding-sans text-sm leading-relaxed text-[#5C534A]">
                Nestled on the shores of the lowest point on earth, the Dead Sea Marriott Resort &amp; Spa offers an enchanting oasis of palms, tranquil terraces, and breathtaking sunset panoramas for our celebration.
              </p>
            </div>

            {/* Quick Details List */}
            <div className="space-y-2.5 pt-2 border-t border-[#D4AF37]/30">
              <div className="flex items-start gap-3">
                <Compass className="w-4 h-4 text-[#C5A059] mt-1 shrink-0" />
                <div>
                  <p className="font-cinzel text-xs font-semibold uppercase tracking-wider text-[#2C2724]">
                    Address
                  </p>
                  <p className="font-wedding-sans text-xs text-[#6B5E52]">
                    Dead Sea Road, Sweimeh 11183, Jordan
                  </p>
                </div>
              </div>
            </div>

            {/* Get Directions Button */}
            <div className="pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="venue-directions-link"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#16397C] text-white hover:bg-[#0F2857] transition-all shadow-md hover:shadow-lg font-cinzel text-xs tracking-[0.2em] uppercase"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Google Maps Interactive Location */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E8DFC8]/80 bg-white/40 h-[320px] sm:h-[380px] w-full">
              <iframe
                title="Dead Sea Marriott Resort & Spa Map Location"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-[0.9] contrast-[1.02]"
              />
              
              {/* Map Floating Badge */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-lg bg-white/90 backdrop-blur-md shadow-md border border-[#E8DFC8] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-cinzel text-[11px] font-semibold text-[#16397C] tracking-wider uppercase">
                  Dead Sea Marriott Resort &amp; Spa
                </span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
