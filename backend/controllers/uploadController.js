const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { resolveImageUrl } = require('../services/imageService');

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No image file was provided');
  }
  const url = await resolveImageUrl(req.file);
  res.status(201).json({ success: true, data: { url } });
});

module.exports = { uploadImage };
