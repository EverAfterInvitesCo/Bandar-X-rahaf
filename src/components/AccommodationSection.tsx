import React from 'react';
import { motion } from 'motion/react';
import { Hotel, Phone, ExternalLink } from 'lucide-react';

export const AccommodationSection: React.FC = () => {
  const hotelBookingUrl = "https://www.marriott.com/en-us/hotels/qmdjv-dead-sea-marriott-resort-and-spa/overview/";
  const hotelPhoneNumber = "+962 5 356 0400";
  const hotelPhoneDial = "tel:+96253560400";

  return (
    <section 
      id="accommodation-section"
      className="relative py-20 sm:py-28 px-6 overflow-hidden bg-transparent"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-8"
        >
          <span className="font-cinzel text-xs sm:text-sm tracking-[0.4em] uppercase text-[#BA9267] font-semibold mb-3">
            Guest Stay &amp; Comfort
          </span>
          <h2 className="font-wedding-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#231F20] tracking-wide mb-3">
            Accommodation
          </h2>
          <div className="w-16 h-[1.5px] bg-[#BA9267] mx-auto" />
        </motion.div>

        {/* Box-less Content directly overlying background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center relative max-w-3xl mx-auto"
        >
          {/* Icon Badge */}
          <div className="w-14 h-14 rounded-full bg-[#BA9267]/15 text-[#BA9267] flex items-center justify-center mx-auto mb-6">
            <Hotel className="w-7 h-7" />
          </div>

          {/* Required Prompt Copy */}
          <blockquote className="font-wedding-serif text-xl sm:text-2xl md:text-3xl text-[#231F20] font-normal leading-relaxed max-w-2xl mx-auto mb-10 italic">
            &ldquo;We have partnered with our exceptional hotel. Please mention our wedding when booking to enjoy exclusive rates reserved for our guests.&rdquo;
          </blockquote>

          {/* Action Buttons: Hotel Booking Link & Phone Dial */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            
            {/* Book Online Link */}
            <a
              href={hotelBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="hotel-booking-btn"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#231F20] text-white hover:bg-[#3D352F] border border-[#BA9267]/40 transition-all shadow-md hover:shadow-lg font-cinzel text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center gap-2"
            >
              <span>Book Your Stay at Hotel</span>
              <ExternalLink className="w-4 h-4 text-[#BA9267]" />
            </a>

            {/* Direct Phone Dial Number */}
            <a
              href={hotelPhoneDial}
              id="hotel-dial-btn"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/80 text-[#231F20] hover:bg-white border border-[#BA9267]/50 transition-all shadow-2xs hover:shadow-md font-cinzel text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#BA9267]" />
              <span>Call {hotelPhoneNumber}</span>
            </a>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
