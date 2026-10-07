const storageConfig = require('../config/storage');

// Single seam the rest of the app calls through when it needs the public
// URL for an uploaded file. Local storage just returns the static path;
// Cloudinary streams the buffer multer held in memory and returns the
// secure_url Cloudinary assigns.
function resolveImageUrl(file) {
  if (!file) return Promise.resolve('');

  if (storageConfig.isCloudinary) {
    const cloudinary = require('../config/cloudinary');
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'restrowesite', resource_type: 'image' },
        (err, result) => {
          if (err) return reject(err);
          resolve(result.secure_url);
        }
      );
      stream.end(file.buffer);
    });
  }

  return Promise.resolve(`${storageConfig.localPublicPath}/${file.filename}`);
}

module.exports = { resolveImageUrl };
