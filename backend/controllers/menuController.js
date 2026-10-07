const slugify = require('slugify');
const MenuItem = require('../models/MenuItem');
const MenuCategory = require('../models/MenuCategory');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const crudFactory = require('../utils/crudFactory');

const categoryCrud = crudFactory(MenuCategory, { slugSource: 'name' });
const itemCrud = crudFactory(MenuItem, { slugSource: 'name', populate: 'category' });

// Public endpoint: all active items grouped by their active category, in
// display order — this is what the Menu page's tab filter renders from.
const getPublicMenu = asyncHandler(async (req, res) => {
  const categories = await MenuCategory.find({ isActive: true }).sort({ order: 1 });
  const items = await MenuItem.find({ isActive: true }).populate('category').sort({ order: 1 });

  const grouped = categories.map((category) => ({
    category,
    items: items.filter((item) => item.category && item.category._id.equals(category._id)),
  }));

  res.json({ success: true, data: grouped });
});

const getFeaturedItems = asyncHandler(async (req, res) => {
  const items = await MenuItem.find({ isActive: true, isFeatured: true })
    .populate('category')
    .sort({ order: 1 })
    .limit(8);
  res.json({ success: true, data: items });
});

module.exports = {
  categoryCrud,
  itemCrud,
  getPublicMenu,
  getFeaturedItems,
};
