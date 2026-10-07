// One-off helper: resets a specific admin's password from env vars.
// Useful when SEED_ADMIN_PASSWORD was changed after the account already
// exists (the seed script only creates, never updates, admins).
// Run with: node scripts/resetAdminPassword.js
require('dotenv').config();
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

async function run() {
  await connectDB();

  const email = (process.env.SEED_ADMIN_EMAIL || '').toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env');
    process.exit(1);
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    console.error(`No admin found with email ${email}`);
    process.exit(1);
  }

  admin.passwordHash = await Admin.hashPassword(password);
  await admin.save();
  console.log(`Password reset for ${email}`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
