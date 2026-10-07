const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ApiError = require('../utils/ApiError');
const storageConfig = require('../config/storage');

const uploadDir = path.join(__dirname, '..', storageConfig.localUploadDir);
if (!storageConfig.isCloudinary && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// Disk storage is only used when STORAGE_PROVIDER=local. When it is set to
// "cloudinary" the file is held in memory and the Cloudinary service (not
// yet wired up) would stream it up instead — see services/imageService.js.
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  },
});

const storageEngine = storageConfig.isCloudinary ? multer.memoryStorage() : diskStorage;

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      return cb(new ApiError(400, 'Only JPEG, PNG, WebP or AVIF images are allowed'));
    }
    cb(null, true);
  },
});

module.exports = upload;
