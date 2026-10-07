const slugify = require('slugify');
const asyncHandler = require('./asyncHandler');
const ApiError = require('./ApiError');

// Admin CRUD for Service/Package/Gallery/Testimonial/MenuCategory/MenuItem
// is structurally identical (list, read, create, update, delete, each
// scoped to one Mongoose model) — this factory removes that repetition.
// Anything with different behavior (menu filtering, enquiry status
// transitions, auth) still gets its own controller.
function crudFactory(Model, { slugSource, populate } = {}) {
  const getAll = asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.active === 'true') filter.isActive = true;
    if (req.query.category) filter.category = req.query.category;

    let query = Model.find(filter).sort({ order: 1, createdAt: -1 });
    if (populate) query = query.populate(populate);
    const items = await query;
    res.json({ success: true, data: items });
  });

  const getOne = asyncHandler(async (req, res) => {
    let query = Model.findById(req.params.id);
    if (populate) query = query.populate(populate);
    const item = await query;
    if (!item) throw new ApiError(404, 'Not found');
    res.json({ success: true, data: item });
  });

  const create = asyncHandler(async (req, res) => {
    const payload = { ...req.body };
    if (slugSource && !payload.slug && payload[slugSource]) {
      payload.slug = slugify(payload[slugSource], { lower: true, strict: true });
    }
    const item = await Model.create(payload);
    res.status(201).json({ success: true, data: item });
  });

  const update = asyncHandler(async (req, res) => {
    const payload = { ...req.body };
    if (slugSource && payload[slugSource] && !payload.slug) {
      payload.slug = slugify(payload[slugSource], { lower: true, strict: true });
    }
    const item = await Model.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!item) throw new ApiError(404, 'Not found');
    res.json({ success: true, data: item });
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) throw new ApiError(404, 'Not found');
    res.json({ success: true, data: { id: req.params.id } });
  });

  return { getAll, getOne, create, update, remove };
}

module.exports = crudFactory;
