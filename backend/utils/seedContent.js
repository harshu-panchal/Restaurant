require('dotenv').config();
const connectDB = require('../config/db');
const MenuCategory = require('../models/MenuCategory');
const MenuItem = require('../models/MenuItem');
const Service = require('../models/Service');
const Package = require('../models/Package');
const Gallery = require('../models/Gallery');
const Testimonial = require('../models/Testimonial');

// Populates realistic starter content (menu, services, packages, gallery)
// so the admin panel and public site aren't empty on first run. Testimonials
// are seeded unpublished with placeholder text only — never fabricated
// reviews — so the admin must deliberately replace and publish them.
// Run with: npm run seed:content

const categories = [
  { name: 'Welcome Drinks', order: 1 },
  { name: 'Soups', order: 2 },
  { name: 'Starters', order: 3 },
  { name: 'Chaat', order: 4 },
  { name: 'Indian Main Course', order: 5 },
  { name: 'Dal', order: 6 },
  { name: 'Rice & Biryani', order: 7 },
  { name: 'Indian Breads', order: 8 },
  { name: 'Live Counters', order: 9 },
  { name: 'Desserts', order: 10 },
  { name: 'Beverages', order: 11 },
];

const itemsByCategory = {
  'Welcome Drinks': [
    ['Jal Jeera', 'A tangy, spiced welcome drink served chilled.', 'veg'],
    ['Masala Chaas', 'Buttermilk tempered with curry leaves and cumin.', 'veg'],
  ],
  Starters: [
    ['Tandoori Paneer Tikka', 'Cottage cheese marinated in yoghurt and spices, grilled over coals.', 'veg'],
    ['Malai Chicken Tikka', 'Chicken marinated in cream and mild spices, char-grilled.', 'non-veg'],
    ['Dahi Ke Kebab', 'Hung curd kebabs, lightly spiced and pan-seared.', 'veg'],
  ],
  'Indian Main Course': [
    ['Paneer Lababdar', 'Cottage cheese simmered in a rich tomato and cashew gravy.', 'veg'],
    ['Butter Chicken', 'Tandoori chicken finished in a velvety tomato-butter sauce.', 'non-veg'],
    ['Dal Makhani', 'Slow-cooked black lentils with butter and cream.', 'veg'],
  ],
  'Rice & Biryani': [
    ['Hyderabadi Vegetable Biryani', 'Fragrant basmati rice layered with vegetables and whole spices.', 'veg'],
    ['Awadhi Mutton Biryani', 'Slow-cooked dum biryani with tender mutton.', 'non-veg'],
  ],
  'Indian Breads': [
    ['Tandoori Roti', 'Whole wheat bread baked in the tandoor.', 'veg'],
    ['Butter Naan', 'Leavened bread finished with butter.', 'veg'],
  ],
  'Live Counters': [
    ['Chaat Counter', 'Freshly assembled pani puri, bhel and dahi puri.', 'veg'],
    ['Pasta Counter', 'Made-to-order pasta with a choice of sauces.', 'veg'],
  ],
  Desserts: [
    ['Gulab Jamun', 'Soft milk dumplings soaked in rose-cardamom syrup.', 'veg'],
    ['Phirni', 'Ground rice pudding set in earthen bowls.', 'veg'],
  ],
  Beverages: [
    ['Masala Chai', 'Spiced tea served live.', 'veg'],
  ],
};

const services = [
  {
    title: 'Wedding Catering',
    description: 'Complete catering for weddings and receptions, from menu planning to on-site execution.',
    features: ['Menu consultation', 'Buffet or plated service', 'Live counters', 'Service staff'],
    image: '/images/service-wedding-catering.svg',
    order: 1,
  },
  {
    title: 'Engagements',
    description: 'Elegant, right-sized menus designed for intimate engagement celebrations.',
    features: ['Curated short menus', 'Welcome drinks', 'Dessert table'],
    image: '/images/service-engagements.svg',
    order: 2,
  },
  {
    title: 'Haldi & Mehndi',
    description: 'Lively, colourful menus designed around traditional pre-wedding functions.',
    features: ['Chaat & snack counters', 'Regional favourites', 'Casual buffet styling'],
    image: '/images/service-haldi-mehndi.svg',
    order: 3,
  },
  {
    title: 'Live Counters',
    description: 'Freshly prepared food and interactive stations that bring energy to any celebration.',
    features: ['Chef-manned stations', 'Customisable cuisines', 'Scalable to guest count'],
    image: '/images/service-live-counters.svg',
    order: 4,
  },
  {
    title: 'Private Celebrations',
    description: 'Birthdays, anniversaries and family gatherings catered with the same care as a wedding.',
    features: ['Flexible guest counts', 'At-home or venue setup'],
    image: '/images/service-private-celebrations.svg',
    order: 5,
  },
  {
    title: 'Corporate Events',
    description: 'Professional catering for corporate events, conferences and office celebrations.',
    features: ['Punctual service', 'Professional staff', 'Packed meal options'],
    image: '/images/service-corporate-events.svg',
    order: 6,
  },
];

const packages = [
  {
    title: 'Classic',
    description: 'For intimate celebrations where thoughtful simplicity matters most.',
    features: ['Menu consultation', '2 starters, 3 mains', 'Buffet setup', 'Service staff'],
    suitableFor: 'Intimate celebrations',
    image: '/images/package-classic.svg',
    order: 1,
  },
  {
    title: 'Signature',
    description: 'For larger wedding celebrations that call for a fuller spread and live counters.',
    features: ['Menu consultation', '4 starters, 5 mains', 'One live counter', 'Buffet or plated service', 'Service staff'],
    suitableFor: 'Larger wedding celebrations',
    image: '/images/package-signature.svg',
    order: 2,
  },
  {
    title: 'Royal',
    description: 'For premium weddings and elaborate events with multiple live counters and a dedicated team.',
    features: ['Dedicated menu consultant', '6+ starters, 7+ mains', 'Multiple live counters', 'Premium buffet styling', 'Full service staff'],
    suitableFor: 'Premium weddings & elaborate events',
    image: '/images/package-royal.svg',
    order: 3,
  },
];

const galleryItems = [
  ['gallery-wedding-1', 'wedding', 'portrait'],
  ['gallery-wedding-2', 'wedding', 'landscape'],
  ['gallery-wedding-3', 'wedding', 'landscape'],
  ['gallery-food-1', 'food', 'square'],
  ['gallery-food-2', 'food', 'portrait'],
  ['gallery-food-3', 'food', 'landscape'],
  ['gallery-buffet-1', 'buffet', 'landscape'],
  ['gallery-buffet-2', 'buffet', 'square'],
  ['gallery-live-counter-1', 'live-counter', 'portrait'],
  ['gallery-decor-1', 'decor', 'landscape'],
  ['gallery-decor-2', 'decor', 'square'],
  ['gallery-event-1', 'other', 'portrait'],
];

async function seed() {
  await connectDB();

  await Promise.all([
    MenuCategory.deleteMany({}),
    MenuItem.deleteMany({}),
    Service.deleteMany({}),
    Package.deleteMany({}),
    Gallery.deleteMany({}),
    Testimonial.deleteMany({}),
  ]);

  const createdCategories = {};
  for (const cat of categories) {
    const slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const doc = await MenuCategory.create({ ...cat, slug });
    createdCategories[cat.name] = doc;
  }

  const categoryImage = {
    'Welcome Drinks': '/images/dish-live-counter.svg',
    Starters: '/images/dish-starters.svg',
    'Indian Main Course': '/images/dish-main-course.svg',
    'Rice & Biryani': '/images/dish-biryani.svg',
    'Indian Breads': '/images/dish-breads.svg',
    'Live Counters': '/images/dish-live-counter.svg',
    Desserts: '/images/dish-desserts.svg',
    Beverages: '/images/dish-live-counter.svg',
  };

  let itemOrder = 0;
  for (const [categoryName, items] of Object.entries(itemsByCategory)) {
    const category = createdCategories[categoryName];
    if (!category) continue;
    for (const [name, description, dietaryType] of items) {
      itemOrder += 1;
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      await MenuItem.create({
        name,
        slug,
        category: category._id,
        description,
        dietaryType,
        isFeatured: itemOrder % 3 === 0,
        order: itemOrder,
        image: categoryImage[categoryName] || '/images/dish-main-course.svg',
      });
    }
  }

  for (const service of services) {
    const slug = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    await Service.create({ ...service, slug });
  }

  for (const pkg of packages) {
    const slug = pkg.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    await Package.create({ ...pkg, slug });
  }

  let galleryOrder = 0;
  for (const [id, category, orientation] of galleryItems) {
    galleryOrder += 1;
    await Gallery.create({
      title: '',
      image: `/images/${id}.svg`,
      category,
      orientation,
      order: galleryOrder,
    });
  }

  // Deliberately unpublished — the business owner must supply and approve
  // real testimonials before they appear on the site.
  await Testimonial.create({
    name: 'Customer name',
    eventType: 'Wedding',
    testimonial: 'Customer testimonial will appear here.',
    isPublished: false,
    order: 1,
  });

  console.log('Seeded menu, services, packages and gallery content.');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
