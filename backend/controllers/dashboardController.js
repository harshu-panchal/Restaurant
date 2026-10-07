const Enquiry = require('../models/Enquiry');
const MenuItem = require('../models/MenuItem');
const Gallery = require('../models/Gallery');
const Package = require('../models/Package');
const Service = require('../models/Service');
const asyncHandler = require('../utils/asyncHandler');

// Only counts that can be computed directly from stored records — no
// fabricated analytics, conversion rates, or trends.
const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalEnquiries, newEnquiries, menuItems, galleryItems, packages, services] = await Promise.all([
    Enquiry.countDocuments(),
    Enquiry.countDocuments({ status: 'New' }),
    MenuItem.countDocuments({ isActive: true }),
    Gallery.countDocuments({ isActive: true }),
    Package.countDocuments({ isActive: true }),
    Service.countDocuments({ isActive: true }),
  ]);

  const recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(5);

  res.json({
    success: true,
    data: {
      totalEnquiries,
      newEnquiries,
      menuItems,
      galleryItems,
      packages,
      services,
      recentEnquiries,
    },
  });
});

module.exports = { getDashboardStats };
