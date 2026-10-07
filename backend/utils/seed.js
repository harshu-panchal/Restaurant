require('dotenv').config();
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const SiteSettings = require('../models/SiteSettings');

// One-time setup script: creates the first admin login and the default
// SiteSettings document so the admin panel isn't empty on first run.
// Run with: npm run seed
async function seed() {
  await connectDB();

  const email = (process.env.SEED_ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const existing = await Admin.findOne({ email });

  if (!existing) {
    const passwordHash = await Admin.hashPassword(process.env.SEED_ADMIN_PASSWORD || 'change-this-password');
    await Admin.create({
      name: process.env.SEED_ADMIN_NAME || 'Admin',
      email,
      passwordHash,
      role: 'superadmin',
    });
    console.log(`Created admin user: ${email}`);
  } else {
    console.log(`Admin user already exists: ${email}`);
  }

  const settings = await SiteSettings.findOne();
  if (!settings) {
    await SiteSettings.create({
      businessName: 'Zaffran & Co.',
      whatsapp: process.env.BUSINESS_WHATSAPP_NUMBER || '',
      phone: process.env.BUSINESS_PHONE || '',
      email: process.env.BUSINESS_EMAIL || '',
    });
    console.log('Created default site settings');
  } else {
    console.log('Site settings already exist');
  }

  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
