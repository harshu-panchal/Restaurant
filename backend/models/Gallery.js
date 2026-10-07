const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: '' },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ['wedding', 'food', 'buffet', 'live-counter', 'decor', 'other'],
      default: 'other',
    },
    description: { type: String, trim: true, default: '' },
    orientation: { type: String, enum: ['portrait', 'landscape', 'square'], default: 'landscape' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', galleryItemSchema);
