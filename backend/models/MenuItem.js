const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuCategory', required: true },
    description: { type: String, trim: true, default: '' },
    image: { type: String, default: '' },
    dietaryType: { type: String, enum: ['veg', 'non-veg', 'egg'], default: 'veg' },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

menuItemSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);
