import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images');
mkdirSync(outDir, { recursive: true });

const PALETTES = [
  ['#2a1f1a', '#5a2428'],
  ['#2f2420', '#6b4a32'],
  ['#1f1b17', '#8a6a2c'],
  ['#3a2a28', '#b08a3e'],
];

function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

// Label sits in a small corner chip rather than dead-center, so it never
// competes with real foreground text (hero headings, page titles) that
// gets overlaid on these placeholders before real photography is dropped in.
function svgPlaceholder({ label, sub, width, height, id }) {
  const palette = PALETTES[hashStr(id) % PALETTES.length];
  const [from, to] = palette;
  const gradId = `g-${id}`;
  const patternId = `p-${id}`;
  const fontSize = Math.max(11, Math.min(14, width / 70));
  const chipText = sub ? `${label} — ${sub}` : label;
  const chipPaddingX = 14;
  const chipWidth = Math.min(width - 32, chipText.length * fontSize * 0.56 + chipPaddingX * 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <pattern id="${patternId}" width="64" height="64" patternUnits="userSpaceOnUse">
      <circle cx="32" cy="32" r="1.4" fill="#F7F2E8" opacity="0.08"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${gradId})"/>
  <rect width="${width}" height="${height}" fill="url(#${patternId})"/>
  <rect x="18" y="18" width="${width - 36}" height="${height - 36}" fill="none" stroke="#F7F2E8" stroke-opacity="0.18" stroke-width="1"/>
  <g transform="translate(16, ${height - 16 - 28})">
    <rect x="0" y="0" width="${chipWidth}" height="28" fill="#171513" opacity="0.55" rx="2"/>
    <text x="${chipPaddingX}" y="18" font-family="Arial, sans-serif" font-size="${fontSize}" letter-spacing="0.5" fill="#F7F2E8" opacity="0.85">${chipText}</text>
  </g>
</svg>`;
}

const images = [
  { id: 'hero-wedding', label: 'Wedding Buffet Photography', sub: 'Replace with hero image', width: 1600, height: 1200 },
  { id: 'intro-hospitality', label: 'Hospitality & Service', sub: 'Replace with photo', width: 1000, height: 1250 },
  { id: 'about-story', label: 'Our Story', sub: 'Replace with photo', width: 1200, height: 1500 },
  { id: 'about-kitchen', label: 'Our Kitchen', sub: 'Replace with photo', width: 1200, height: 900 },
  { id: 'about-philosophy', label: 'Our Philosophy', sub: 'Replace with photo', width: 1200, height: 900 },
  { id: 'about-approach', label: 'Our Approach', sub: 'Replace with photo', width: 1200, height: 900 },

  { id: 'dish-starters', label: 'Starters', sub: 'Dish photo', width: 800, height: 800 },
  { id: 'dish-main-course', label: 'Main Course', sub: 'Dish photo', width: 800, height: 800 },
  { id: 'dish-breads', label: 'Indian Breads', sub: 'Dish photo', width: 800, height: 800 },
  { id: 'dish-biryani', label: 'Rice & Biryani', sub: 'Dish photo', width: 800, height: 800 },
  { id: 'dish-live-counter', label: 'Live Counters', sub: 'Dish photo', width: 800, height: 800 },
  { id: 'dish-desserts', label: 'Desserts', sub: 'Dish photo', width: 800, height: 800 },

  { id: 'service-wedding-catering', label: 'Wedding Catering', sub: 'Service photo', width: 1200, height: 1500 },
  { id: 'service-engagements', label: 'Engagements', sub: 'Service photo', width: 900, height: 700 },
  { id: 'service-haldi-mehndi', label: 'Haldi & Mehndi', sub: 'Service photo', width: 900, height: 700 },
  { id: 'service-live-counters', label: 'Live Counters', sub: 'Service photo', width: 900, height: 700 },
  { id: 'service-private-celebrations', label: 'Private Celebrations', sub: 'Service photo', width: 900, height: 700 },
  { id: 'service-corporate-events', label: 'Corporate Events', sub: 'Service photo', width: 900, height: 700 },

  { id: 'package-classic', label: 'Classic', sub: 'Package photo', width: 900, height: 1100 },
  { id: 'package-signature', label: 'Signature', sub: 'Package photo', width: 900, height: 1100 },
  { id: 'package-royal', label: 'Royal', sub: 'Package photo', width: 900, height: 1100 },

  { id: 'experience-journey', label: 'The Wedding Catering Journey', sub: 'Photo', width: 1400, height: 1000 },

  { id: 'quote-cta', label: 'Plan Your Celebration', sub: 'Photo', width: 1600, height: 900 },

  { id: 'contact-map', label: 'Venue / Kitchen Location', sub: 'Map or photo', width: 1200, height: 800 },

  { id: 'og-default', label: 'Zaffran & Co.', sub: 'Social share image', width: 1200, height: 630 },
];

// Gallery grid needs a good spread of orientations for the masonry layout.
const galleryShots = [
  ['gallery-wedding-1', 'Wedding', 'portrait', 900, 1200],
  ['gallery-wedding-2', 'Wedding', 'landscape', 1200, 800],
  ['gallery-food-1', 'Food', 'square', 1000, 1000],
  ['gallery-food-2', 'Food', 'portrait', 900, 1200],
  ['gallery-buffet-1', 'Buffet Setup', 'landscape', 1300, 850],
  ['gallery-buffet-2', 'Buffet Setup', 'square', 1000, 1000],
  ['gallery-live-counter-1', 'Live Counter', 'portrait', 900, 1200],
  ['gallery-decor-1', 'Decor', 'landscape', 1300, 850],
  ['gallery-decor-2', 'Decor', 'square', 1000, 1000],
  ['gallery-wedding-3', 'Wedding', 'landscape', 1300, 850],
  ['gallery-food-3', 'Food', 'landscape', 1200, 800],
  ['gallery-event-1', 'Events', 'portrait', 900, 1200],
];

for (const img of images) {
  const svg = svgPlaceholder(img);
  writeFileSync(join(outDir, `${img.id}.svg`), svg, 'utf-8');
}

for (const [id, label, orientation, width, height] of galleryShots) {
  const svg = svgPlaceholder({ id, label, sub: orientation, width, height });
  writeFileSync(join(outDir, `${id}.svg`), svg, 'utf-8');
}

console.log(`Generated ${images.length + galleryShots.length} placeholder images in ${outDir}`);
