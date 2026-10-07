const mongoose = require('mongoose');

// Singleton document (there is only ever one SiteSettings row) that holds
// every business-specific value referenced across the public site, so
// nothing business-specific is hardcoded in frontend components.
const siteSettingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: 'Your Catering Business' },
    logo: { type: String, default: '' },
    favicon: { type: String, default: '' },
    phone: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, default: '' },
    mapEmbedUrl: { type: String, default: '' },
    businessHours: { type: String, default: '' },
    social: {
      instagram: { type: String, default: '' },
      facebook: { type: String, default: '' },
      youtube: { type: String, default: '' },
    },
    hero: {
      eyebrow: { type: String, default: 'WEDDING CATERING' },
      heading: { type: String, default: 'Where Every Celebration Finds Its Flavour' },
      description: {
        type: String,
        default:
          'Thoughtfully crafted menus and seamless catering for weddings, receptions and celebrations worth remembering.',
      },
      image: { type: String, default: '' },
    },
    ctaLabels: {
      primary: { type: String, default: 'Get a Quote' },
      secondary: { type: String, default: 'Explore Menu' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
