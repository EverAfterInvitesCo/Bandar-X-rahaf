import fs from 'fs';
import path from 'path';

// Envelope SVG with royal blue shell wax seal matching user's image
const envelopeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <linearGradient id="paperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FBF8F3"/>
      <stop offset="100%" stop-color="#F2ECE1"/>
    </linearGradient>
    <linearGradient id="flapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#F4EFE6"/>
      <stop offset="100%" stop-color="#EBE3D5"/>
    </linearGradient>
    <radialGradient id="sealGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#2558B5"/>
      <stop offset="40%" stop-color="#1B428E"/>
      <stop offset="85%" stop-color="#122F6A"/>
      <stop offset="100%" stop-color="#0B1E45"/>
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#3A3022" flood-opacity="0.18"/>
    </filter>
    <filter id="sealShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#091838" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Envelope Body Base -->
  <rect width="1080" height="1920" fill="url(#paperGrad)"/>

  <!-- Subtle Paper Texture Lines -->
  <path d="M 0 0 L 540 850 L 1080 0 Z" fill="url(#flapGrad)" filter="url(#shadow)" stroke="#E4DCD0" stroke-width="1.5"/>
  <path d="M 0 1920 L 540 1150 L 1080 1920 Z" fill="#F8F3EB" stroke="#E6DDD1" stroke-width="1.5"/>
  <path d="M 0 0 L 540 1020 L 0 1920 Z" fill="#F3ECE0" opacity="0.6"/>
  <path d="M 1080 0 L 540 1020 L 1080 1920 Z" fill="#EFE8DC" opacity="0.6"/>

  <!-- Centered Wax Seal Shell (Royal Blue) -->
  <g transform="translate(540, 960)" filter="url(#sealShadow)">
    <!-- Outer wax rim with organic edges -->
    <circle cx="0" cy="0" r="140" fill="url(#sealGrad)"/>
    <circle cx="0" cy="0" r="132" fill="none" stroke="#366EC9" stroke-width="3" opacity="0.5"/>
    <circle cx="0" cy="0" r="118" fill="url(#sealGrad)"/>
    
    <!-- Scallop Shell Emblem Emboss -->
    <g fill="#16397C" stroke="#467CD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <!-- Shell Fan ribs -->
      <path d="M -15 65 C -45 50 -70 20 -70 -15 C -70 -65 -45 -90 0 -95 C 45 -90 70 -65 70 -15 C 70 20 45 50 15 65 Z" fill="#183D82" opacity="0.9"/>
      
      <!-- Shell rays -->
      <path d="M 0 55 L 0 -92" stroke="#689DF0" stroke-width="4.5"/>
      <path d="M -5 55 Q -25 -20 -30 -85" stroke="#5A91E8" stroke-width="4"/>
      <path d="M 5 55 Q 25 -20 30 -85" stroke="#5A91E8" stroke-width="4"/>
      <path d="M -10 57 Q -48 -10 -55 -68" stroke="#4D84DB" stroke-width="3.5"/>
      <path d="M 10 57 Q 48 -10 55 -68" stroke="#4D84DB" stroke-width="3.5"/>
      <path d="M -12 60 Q -65 0 -66 -35" stroke="#3F74C7" stroke-width="3"/>
      <path d="M 12 60 Q 65 0 66 -35" stroke="#3F74C7" stroke-width="3"/>
      
      <!-- Base scallop hinge -->
      <path d="M -30 65 Q 0 80 30 65 Q 15 50 0 52 Q -15 50 -30 65 Z" fill="#122C62" stroke="#5A91E8" stroke-width="2.5"/>
    </g>
    
    <!-- Light Reflection Highlight -->
    <ellipse cx="-45" cy="-45" rx="30" ry="15" transform="rotate(-30, -45, -45)" fill="#FFFFFF" opacity="0.22"/>
  </g>
</svg>`;

// Dead Sea Marriott Resort & Spa line art illustration (transparent background)
const venueSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 650" width="1400" height="650" fill="none">
  <defs>
    <linearGradient id="bronzeGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C5A059"/>
      <stop offset="50%" stop-color="#9E7A3E"/>
      <stop offset="100%" stop-color="#7B5C28"/>
    </linearGradient>
    <linearGradient id="softSea" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#B89B68" stop-opacity="0.2"/>
      <stop offset="50%" stop-color="#CBB184" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#B89B68" stop-opacity="0.2"/>
    </linearGradient>
  </defs>

  <!-- Mountain range backdrop across Dead Sea -->
  <path d="M 0 170 Q 250 120 500 160 T 900 130 T 1400 165 L 1400 200 L 0 200 Z" fill="url(#softSea)"/>
  <path d="M 0 165 Q 300 100 650 145 T 1200 120 T 1400 150" stroke="#9E7A3E" stroke-width="1.2" opacity="0.6"/>
  <path d="M 100 160 Q 400 110 800 140 T 1350 130" stroke="#B89B68" stroke-width="0.8" opacity="0.5"/>

  <!-- Dead Sea Water Horizon & Reflections -->
  <line x1="0" y1="205" x2="1400" y2="205" stroke="#9E7A3E" stroke-width="1.5" opacity="0.6"/>
  <line x1="150" y1="215" x2="1250" y2="215" stroke="#C5A059" stroke-width="1" stroke-dasharray="12, 10" opacity="0.4"/>
  <line x1="300" y1="225" x2="1100" y2="225" stroke="#C5A059" stroke-width="0.8" stroke-dasharray="20, 14" opacity="0.3"/>

  <!-- Main Resort Architecture -->
  <g stroke="#8F6B32" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none">
    
    <!-- Central Dome & Main Lobby Facade -->
    <!-- Dome -->
    <path d="M 640 280 Q 700 215 760 280 Z" fill="#FDFBF7" fill-opacity="0.4" stroke-width="2"/>
    <path d="M 700 215 L 700 205 M 695 205 L 705 205" stroke-width="2"/>
    <path d="M 660 270 Q 700 230 740 270" stroke-width="1"/>
    
    <!-- Central Portico & Arch Entrance -->
    <rect x="620" y="280" width="160" height="230" fill="#FCFAF6" fill-opacity="0.2"/>
    <!-- Pediment & Cornice -->
    <path d="M 610 280 L 790 280 M 615 290 L 785 290"/>
    
    <!-- Resort Logo Text inside Facade -->
    <text x="700" y="325" font-family="'Cinzel', serif" font-size="13" font-weight="600" fill="#7B5C28" text-anchor="middle" letter-spacing="3">DEAD SEA</text>
    <text x="700" y="355" font-family="'Cinzel Decorative', 'Cinzel', serif" font-size="24" font-weight="700" fill="#65471A" text-anchor="middle" letter-spacing="1">Marriott</text>
    <text x="700" y="375" font-family="'Cinzel', serif" font-size="11" font-weight="500" fill="#8F6B32" text-anchor="middle" letter-spacing="4">RESORT &amp; SPA</text>

    <!-- Main Grand Arch Entrance -->
    <path d="M 660 510 L 660 450 Q 700 405 740 450 L 740 510 Z" stroke-width="2.5" fill="#FAF5EB" fill-opacity="0.4"/>
    <path d="M 670 510 L 670 455 Q 700 420 730 455 L 730 510" stroke-width="1.2"/>
    <line x1="700" y1="418" x2="700" y2="510" stroke-width="1.2"/>
    
    <!-- Left Wing -->
    <rect x="340" y="340" width="280" height="170" fill="#FCFAF6" fill-opacity="0.2"/>
    <!-- Left Windows & Arches -->
    <path d="M 370 380 Q 390 355 410 380 L 410 420 L 370 420 Z"/>
    <path d="M 430 380 Q 450 355 470 380 L 470 420 L 430 420 Z"/>
    <path d="M 490 380 Q 510 355 530 380 L 530 420 L 490 420 Z"/>
    <path d="M 550 380 Q 570 355 590 380 L 590 420 L 550 420 Z"/>
    
    <!-- Lower Left Terraces & Balconies -->
    <path d="M 360 440 L 600 440 M 360 450 L 600 450"/>
    <path d="M 375 460 L 405 460 L 405 505 L 375 505 Z"/>
    <path d="M 435 460 L 465 460 L 465 505 L 435 505 Z"/>
    <path d="M 495 460 L 525 460 L 525 505 L 495 505 Z"/>
    <path d="M 555 460 L 585 460 L 585 505 L 555 505 Z"/>

    <!-- Far Left Tower & Villa Pavilion -->
    <rect x="230" y="370" width="110" height="140"/>
    <path d="M 220 370 L 350 370 M 230 360 L 340 360"/>
    <path d="M 255 400 Q 270 385 285 400 L 285 435 L 255 435 Z"/>
    <path d="M 295 400 Q 310 385 325 400 L 325 435 L 295 435 Z"/>

    <!-- Right Wing -->
    <rect x="780" y="340" width="280" height="170" fill="#FCFAF6" fill-opacity="0.2"/>
    <path d="M 810 380 Q 830 355 850 380 L 850 420 L 810 420 Z"/>
    <path d="M 870 380 Q 890 355 910 380 L 910 420 L 870 420 Z"/>
    <path d="M 930 380 Q 950 355 970 380 L 970 420 L 930 420 Z"/>
    <path d="M 990 380 Q 1010 355 1030 380 L 1030 420 L 990 420 Z"/>
    
    <!-- Right Terraces -->
    <path d="M 800 440 L 1040 440 M 800 450 L 1040 450"/>
    <path d="M 815 460 L 845 460 L 845 505 L 815 505 Z"/>
    <path d="M 875 460 L 905 460 L 905 505 L 875 505 Z"/>
    <path d="M 935 460 L 965 460 L 965 505 L 935 505 Z"/>
    <path d="M 995 460 L 1025 460 L 1025 505 L 995 505 Z"/>

    <!-- Far Right Pavilion with Gazebo & Terraces -->
    <rect x="1060" y="360" width="130" height="150"/>
    <path d="M 1050 360 L 1200 360 M 1060 350 L 1190 350"/>
    <path d="M 1080 395 Q 1100 380 1120 395 L 1120 435 L 1080 435 Z"/>
    <path d="M 1140 395 Q 1160 380 1180 395 L 1180 435 L 1140 435 Z"/>

    <!-- Grand Fountain in Front Courtyard -->
    <ellipse cx="700" cy="570" rx="90" ry="25" fill="#F8F3EA" fill-opacity="0.6"/>
    <ellipse cx="700" cy="570" rx="75" ry="18"/>
    <ellipse cx="700" cy="565" rx="40" ry="10"/>
    <!-- Water Jets -->
    <path d="M 700 565 Q 695 530 685 520 Q 695 510 700 500 Q 705 510 715 520 Q 705 530 700 565" fill="#D2B57B" fill-opacity="0.3" stroke="#8F6B32" stroke-width="1.2"/>
    <path d="M 700 565 Q 675 535 660 545" stroke-dasharray="3,3"/>
    <path d="M 700 565 Q 725 535 740 545" stroke-dasharray="3,3"/>

    <!-- Courtyard Driveway Curves -->
    <path d="M 520 630 C 580 570 600 530 630 520"/>
    <path d="M 880 630 C 820 570 800 530 770 520"/>
  </g>

  <!-- Elegant Lush Palm Trees & Topiary Landscape -->
  <!-- Left Majestic Palms -->
  <g stroke="#7B5C28" stroke-width="1.8" fill="#A8874E" fill-opacity="0.15">
    <!-- Tall Palm 1 -->
    <path d="M 70 600 Q 80 400 90 220" stroke-width="5" stroke="#7B5C28"/>
    <!-- Fronds -->
    <path d="M 90 220 Q 20 200 -20 230 M 90 220 Q 40 160 0 170 M 90 220 Q 80 130 90 120 M 90 220 Q 140 140 180 160 M 90 220 Q 160 190 200 230 M 90 220 Q 130 250 160 290 M 90 220 Q 50 260 20 280" stroke-width="2.5"/>
    
    <!-- Medium Palm 2 -->
    <path d="M 160 620 Q 175 460 190 320" stroke-width="4.5" stroke="#7B5C28"/>
    <path d="M 190 320 Q 110 300 70 330 M 190 320 Q 140 250 100 260 M 190 320 Q 185 230 200 220 M 190 320 Q 240 250 280 270 M 190 320 Q 270 310 290 350 M 190 320 Q 220 370 230 400" stroke-width="2"/>
    
    <!-- Courtyard Palms -->
    <path d="M 330 580 Q 335 480 340 400" stroke-width="3" stroke="#7B5C28"/>
    <path d="M 340 400 Q 280 380 260 410 M 340 400 Q 320 350 310 340 M 340 400 Q 370 350 390 370 M 340 400 Q 400 400 410 430" stroke-width="1.8"/>

    <path d="M 580 580 Q 575 490 570 420" stroke-width="3" stroke="#7B5C28"/>
    <path d="M 570 420 Q 520 400 500 430 M 570 420 Q 550 370 540 360 M 570 420 Q 600 370 615 390 M 570 420 Q 620 420 630 440" stroke-width="1.8"/>

    <!-- Right Side Palms -->
    <path d="M 830 580 Q 835 490 840 420" stroke-width="3" stroke="#7B5C28"/>
    <path d="M 840 420 Q 790 400 770 430 M 840 420 Q 820 370 810 360 M 840 420 Q 870 370 890 390 M 840 420 Q 900 420 910 440" stroke-width="1.8"/>

    <path d="M 1240 610 Q 1230 450 1220 300" stroke-width="4.5" stroke="#7B5C28"/>
    <path d="M 1220 300 Q 1140 280 1100 310 M 1220 300 Q 1180 230 1140 240 M 1220 300 Q 1220 210 1240 200 M 1220 300 Q 1270 230 1310 250 M 1220 300 Q 1300 290 1330 330" stroke-width="2"/>

    <path d="M 1330 630 Q 1340 470 1350 330" stroke-width="4.5" stroke="#7B5C28"/>
    <path d="M 1350 330 Q 1270 310 1230 340 M 1350 330 Q 1310 260 1280 270 M 1350 330 Q 1350 240 1370 230 M 1350 330 Q 1400 260 1430 280" stroke-width="2"/>
  </g>
</svg>`;

// Background paper pattern with subtle gentle sea water ripples
const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1800" width="1200" height="1800">
  <defs>
    <linearGradient id="parchment" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FCFAF6"/>
      <stop offset="60%" stop-color="#F9F4EB"/>
      <stop offset="100%" stop-color="#F2EAD8"/>
    </linearGradient>
    <linearGradient id="waveStroke" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3A64A8" stop-opacity="0.15"/>
      <stop offset="50%" stop-color="#4B77C2" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#3A64A8" stop-opacity="0.15"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="1800" fill="url(#parchment)"/>

  <!-- Subtle hand-drawn wave ripples at bottom section -->
  <g fill="none" stroke="url(#waveStroke)" stroke-linecap="round">
    <path d="M 50 1450 Q 200 1430 350 1460 T 700 1440 T 1050 1465 T 1180 1445" stroke-width="1.8"/>
    <path d="M 120 1490 Q 280 1465 460 1500 T 820 1475 T 1120 1505" stroke-width="1.6"/>
    <path d="M 30 1540 Q 220 1515 420 1555 T 800 1525 T 1160 1560" stroke-width="2"/>
    <path d="M 180 1585 Q 360 1560 570 1600 T 940 1570 T 1150 1605" stroke-width="1.7"/>
    <path d="M 60 1635 Q 260 1605 500 1645 T 900 1620 T 1180 1650" stroke-width="2.2"/>
    <path d="M 100 1690 Q 320 1660 580 1705 T 980 1675 T 1190 1710" stroke-width="2.5"/>
    <path d="M 40 1745 Q 280 1715 560 1760 T 960 1730 T 1180 1765" stroke-width="3"/>
  </g>
</svg>`;

// Write files to public and public/media
const targets = [
  { file: 'public/envelope.png', content: envelopeSvg },
  { file: 'public/media/envelope.png', content: envelopeSvg },
  { file: 'public/venue.png', content: venueSvg },
  { file: 'public/media/venue.png', content: venueSvg },
  { file: 'public/bg.png', content: bgSvg },
  { file: 'public/media/bg.png', content: bgSvg },
];

targets.forEach(t => {
  fs.writeFileSync(path.resolve(process.cwd(), t.file), t.content, 'utf8');
  console.log('Created:', t.file);
});
