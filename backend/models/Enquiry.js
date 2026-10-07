const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: '' },
    eventType: {
      type: String,
      enum: ['Wedding', 'Reception', 'Engagement', 'Mehndi', 'Haldi', 'Birthday', 'Anniversary', 'Corporate', 'Other'],
      required: true,
    },
    eventDate: { type: Date },
    eventLocation: { type: String, trim: true, default: '' },
    guestCount: { type: Number },
    foodPreference: { type: String, enum: ['Vegetarian', 'Non-Vegetarian', 'Mixed'], default: 'Mixed' },
    cuisinePreferences: { type: [String], default: [] },
    services: { type: [String], default: [] },
    budget: { type: String, trim: true, default: '' },
    message: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Discussion', 'Quoted', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'New',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
