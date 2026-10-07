// One-off fix: replaces a specific set of images from the stock-photo seed
// that turned out to be bad matches on review — either irrelevant to the
// theme, or (more importantly) real identifiable private individuals whose
// photos would misleadingly imply they were catered by this business.
// Safe to delete after running once.
require('dotenv').config();
const connectDB = require('../config/db');
const cloudinary = require('../config/cloudinary');
const Service = require('../models/Service');
const Gallery = require('../models/Gallery');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function downloadBuffer(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'ZaffranCateringSite/1.0 (dev; contact: harshvardhan7193@gmail.com)' },
  });
  if (!res.ok) throw new Error(`Download failed ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function uploadBuffer(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: `restrowesite/${folder}` }, (err, res) => {
      if (err) return reject(err);
      resolve(res.secure_url);
    });
    stream.end(buffer);
  });
}

async function replace(commonsUrl, folder) {
  const buffer = await downloadBuffer(commonsUrl);
  const url = await uploadBuffer(buffer, folder);
  await sleep(800);
  return url;
}

const REPLACEMENTS = {
  services: {
    engagements:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Rice_lights_converging_to_a_center_in_a_outdoor_party_decoration.jpg/1280px-Rice_lights_converging_to_a_center_in_a_outdoor_party_decoration.jpg',
    'haldi-mehndi': 'https://upload.wikimedia.org/wikipedia/commons/0/02/Hand_with_mehndi_design.jpg',
    'private-celebrations':
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/Pink_rose_birthday_cake_%285919553257%29.jpg/1280px-Pink_rose_birthday_cake_%285919553257%29.jpg',
    'corporate-events':
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Conference_room_table_%28Unsplash%29.jpg/1280px-Conference_room_table_%28Unsplash%29.jpg',
  },
};

async function run() {
  await connectDB();

  console.log('Fixing services...');
  for (const [slug, commonsUrl] of Object.entries(REPLACEMENTS.services)) {
    const service = await Service.findOne({ slug });
    if (!service) {
      console.warn(`  service not found: ${slug}`);
      continue;
    }
    const url = await replace(commonsUrl, 'services');
    service.image = url;
    await service.save();
    console.log(`  ${slug}: ${url}`);
  }

  console.log('Fixing gallery items...');
  const galleryFixes = [
    { category: 'wedding', oldUrlFragment: 'd5tentnq376nrzzljxs2', commonsUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/%28A%29_puja_fire%2C_Havanam.jpg/1280px-%28A%29_puja_fire%2C_Havanam.jpg' },
    { category: 'live-counter', oldUrlFragment: 'moeyvkxpikn9hub743ld', commonsUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/DFC_4421_Fresh_mango_slices_and_chilled_fruit_cups_on_display_at_a_busy_night_market_stall.jpg/1280px-DFC_4421_Fresh_mango_slices_and_chilled_fruit_cups_on_display_at_a_busy_night_market_stall.jpg' },
    { category: 'other', oldUrlFragment: 'hwadup5cit2ybpckkb4s', commonsUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Diwali_Diyas.jpg/1280px-Diwali_Diyas.jpg' },
  ];

  for (const fix of galleryFixes) {
    const item = await Gallery.findOne({ image: new RegExp(fix.oldUrlFragment) });
    if (!item) {
      console.warn(`  gallery item not found for fragment: ${fix.oldUrlFragment}`);
      continue;
    }
    const url = await replace(fix.commonsUrl, 'gallery');
    item.image = url;
    await item.save();
    console.log(`  ${fix.category} (${fix.oldUrlFragment}): ${url}`);
  }

  console.log('Done.');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
