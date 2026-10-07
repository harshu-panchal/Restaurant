const Testimonial = require('../models/Testimonial');
const crudFactory = require('../utils/crudFactory');
const asyncHandler = require('../utils/asyncHandler');

const base = crudFactory(Testimonial);

const getPublished = asyncHandler(async (req, res) => {
  const items = await Testimonial.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: items });
});

module.exports = { ...base, getPublished };
