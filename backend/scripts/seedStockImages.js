// One-off helper: replaces the generated SVG placeholder images on already
// -seeded content with real, freely-licensed photography, sourced from the
// Wikimedia Commons API (no key required, CC-licensed, scriptable) and
// uploaded to Cloudinary. Only touches documents whose image still points
// at a /images/*.svg placeholder, so it's safe to re-run after real photos
// have been manually uploaded for some items (those are left alone).
//
// Run with: node scripts/seedStockImages.js
require('dotenv').config();
const connectDB = require('../config/db');
const cloudinary = require('../config/cloudinary');
const MenuItem = require('../models/MenuItem');
const Service = require('../models/Service');
const Package = require('../models/Package');
const Gallery = require('../models/Gallery');
const SiteSettings = require('../models/SiteSettings');

const RASTER_MIME = new Set(['image/jpeg', 'image/png']);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function findCommonsImageUrl(query, attempt = 1) {
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: query,
    gsrnamespace: '6',
    gsrlimit: '8',
    prop: 'imageinfo',
    iiprop: 'url|mime',
    iiurlwidth: '1600',
    format: 'json',
    formatversion: '2',
  });
  const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`, {
    headers: {
      'User-Agent': 'ZaffranCateringSite/1.0 (dev content seeding; contact: harshvardhan7193@gmail.com)',
    },
  });

  if (res.status === 429 && attempt <= 4) {
    const wait = 5000 * attempt;
    console.warn(`  rate limited, waiting ${wait}ms...`);
    await sleep(wait);
    return findCommonsImageUrl(query, attempt + 1);
  }
  if (!res.ok) throw new Error(`Commons API ${res.status} for "${query}"`);

  const data = await res.json();
  const pages = data?.query?.pages || [];

  for (const page of pages) {
    const info = page.imageinfo?.[0];
    const url = info?.thumburl || info?.url;
    if (url && RASTER_MIME.has(info?.mime)) return url;
  }
  return null;
}

async function downloadBuffer(url, attempt = 1) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'ZaffranCateringSite/1.0 (dev content seeding; contact: harshvardhan7193@gmail.com)',
    },
  });
  if (res.status === 429 && attempt <= 4) {
    const wait = 5000 * attempt;
    console.warn(`  download rate limited, waiting ${wait}ms...`);
    await sleep(wait);
    return downloadBuffer(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`Download failed ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

// Downloads the bytes ourselves (with our own pacing/retry) rather than
// letting Cloudinary fetch the remote URL server-side — Cloudinary's own
// fetcher was hitting Wikimedia's rate limit almost immediately, likely
// because its IP range is shared across many customers.
async function uploadToCloudinary(remoteUrl, folder) {
  const buffer = await downloadBuffer(remoteUrl);
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: `restrowesite/${folder}` }, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
    stream.end(buffer);
  });
  return result.secure_url;
}

// Accepts one query or an array of fallback queries tried in order until
// one returns a usable image.
async function resolve(queryOrList, folder, label) {
  const queries = Array.isArray(queryOrList) ? queryOrList : [queryOrList];

  for (const query of queries) {
    const commonsUrl = await findCommonsImageUrl(query);
    if (commonsUrl) {
      const url = await uploadToCloudinary(commonsUrl, folder);
      console.log(`  ${label} ("${query}"): ${url}`);
      await sleep(1200);
      return url;
    }
    console.warn(`  no result for "${query}" (${label}), trying next...`);
    await sleep(800);
  }
  console.warn(`  giving up on ${label}`);
  return null;
}

const DISH_QUERIES = {
  '/images/dish-starters.svg': 'paneer tikka',
  '/images/dish-main-course.svg': 'butter chicken curry',
  '/images/dish-biryani.svg': 'biryani',
  '/images/dish-breads.svg': 'naan bread',
  '/images/dish-live-counter.svg': 'indian street food chaat',
  '/images/dish-desserts.svg': 'gulab jamun',
};

const SERVICE_QUERIES = {
  'wedding-catering': ['indian wedding feast', 'wedding buffet', 'indian wedding food'],
  engagements: ['engagement party', 'party table decoration', 'dinner party table'],
  'haldi-mehndi': ['mehndi ceremony', 'haldi ceremony'],
  'live-counters': ['chef cooking', 'street food stall', 'live cooking'],
  'private-celebrations': ['birthday party', 'party celebration table'],
  'corporate-events': ['corporate event', 'business conference catering', 'office event'],
};

const PACKAGE_QUERIES = {
  classic: ['elegant dinner table', 'fine dining table setting'],
  signature: ['wedding buffet table', 'buffet food table'],
  royal: ['indian wedding decoration', 'grand wedding mandap'],
};

const GALLERY_QUERIES = {
  'gallery-wedding-1': ['indian wedding ceremony', 'hindu wedding'],
  'gallery-wedding-2': ['indian wedding mandap', 'wedding mandap decoration'],
  'gallery-wedding-3': ['indian wedding couple', 'indian bride groom'],
  'gallery-food-1': ['indian thali', 'indian platter'],
  'gallery-food-2': ['indian curry dish', 'indian curry'],
  'gallery-food-3': ['indian food platter', 'indian cuisine'],
  'gallery-buffet-1': ['buffet table food', 'buffet spread'],
  'gallery-buffet-2': ['catering buffet', 'banquet food'],
  'gallery-live-counter-1': ['chef cooking', 'live cooking station'],
  'gallery-decor-1': ['wedding flower decoration', 'flower decoration event'],
  'gallery-decor-2': ['wedding mandap flowers', 'floral wedding decoration'],
  'gallery-event-1': ['indian wedding guests', 'wedding celebration crowd'],
};

async function run() {
  await connectDB();

  console.log('Menu items (by dish category)...');
  for (const [placeholderPath, query] of Object.entries(DISH_QUERIES)) {
    const url = await resolve(query, 'menu', placeholderPath);
    if (!url) continue;
    await MenuItem.updateMany({ image: placeholderPath }, { image: url });
  }

  console.log('Services...');
  const services = await Service.find({});
  for (const service of services) {
    if (!service.image?.endsWith('.svg')) continue;
    const query = SERVICE_QUERIES[service.slug];
    if (!query) continue;
    const url = await resolve(query, 'services', service.slug);
    if (url) {
      service.image = url;
      await service.save();
    }
  }

  console.log('Packages...');
  const packages = await Package.find({});
  for (const pkg of packages) {
    if (!pkg.image?.endsWith('.svg')) continue;
    const query = PACKAGE_QUERIES[pkg.slug];
    if (!query) continue;
    const url = await resolve(query, 'packages', pkg.slug);
    if (url) {
      pkg.image = url;
      await pkg.save();
    }
  }

  console.log('Gallery...');
  const galleryItems = await Gallery.find({});
  for (const item of galleryItems) {
    if (!item.image?.endsWith('.svg')) continue;
    const key = item.image.match(/\/images\/(.+)\.svg$/)?.[1];
    const query = GALLERY_QUERIES[key];
    if (!query) continue;
    const url = await resolve(query, 'gallery', key);
    if (url) {
      item.image = url;
      await item.save();
    }
  }

  console.log('Homepage hero...');
  const settings = await SiteSettings.findOne();
  if (settings && !settings.hero.image) {
    const url = await resolve(['indian wedding feast', 'wedding buffet spread'], 'hero', 'hero-wedding');
    if (url) {
      settings.hero.image = url;
      await settings.save();
    }
  }

  console.log('Done.');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
