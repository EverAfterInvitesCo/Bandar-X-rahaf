import React from 'react';
import { Heart, Instagram, Facebook } from 'lucide-react';

// TikTok Custom Vector Icon using standard SVG for pristine rendering
const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.47 6.27 6.27 0 0 0 1.96-4.46V8.62a8.28 8.28 0 0 0 5.21 1.83V7.01a4.84 4.84 0 0 1-1.39-.32z"/>
  </svg>
);

export const Footer: React.FC = () => {
  const socials = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/_everafterinvites_/',
      icon: <Instagram className="w-4 h-4" />
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@_everafterinvites_',
      icon: <TikTokIcon className="w-4 h-4" />
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61591562833010',
      icon: <Facebook className="w-4 h-4" />
    }
  ];

  return (
    <footer 
      id="wedding-footer"
      className="relative z-10 py-10 px-6 border-t border-[#E8DFC8]/60 bg-transparent text-center"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4">
        
        {/* Social Links */}
        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`everafterinvites on ${social.name}`}
              className="w-9 h-9 rounded-full bg-white/90 border border-[#E8DFC8] text-[#16397C] hover:text-white hover:bg-[#16397C] hover:border-[#16397C] flex items-center justify-center transition-all shadow-2xs hover:scale-105"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Footer Credit Text */}
        <p className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#7B6A58] flex items-center justify-center gap-1.5 flex-wrap">
          <span>Made with love by</span>
          <a 
            href="https://www.instagram.com/_everafterinvites_/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold text-[#16397C] hover:underline"
          >
            everafterinvites
          </a>
        </p>

      </div>
    </footer>
  );
};
