// Central place to decide how uploaded files are stored.
// Switching STORAGE_PROVIDER to "cloudinary" and filling in the Cloudinary
// env vars is enough to move storage off the local disk — nothing else in
// the app needs to change.

const provider = process.env.STORAGE_PROVIDER || 'local';

module.exports = {
  provider,
  isCloudinary: provider === 'cloudinary',
  localUploadDir: 'uploads',
  localPublicPath: '/uploads',
};
