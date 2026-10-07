const { body } = require('express-validator');

const EVENT_TYPES = ['Wedding', 'Reception', 'Engagement', 'Mehndi', 'Haldi', 'Birthday', 'Anniversary', 'Corporate', 'Other'];

module.exports = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('phone').trim().notEmpty().withMessage('Phone number is required').isLength({ min: 7, max: 20 }),
  body('email').optional({ checkFalsy: true }).isEmail().withMessage('Enter a valid email address'),
  body('eventType').trim().notEmpty().isIn(EVENT_TYPES).withMessage('Select a valid event type'),
  body('eventDate').optional({ checkFalsy: true }).isISO8601().withMessage('Enter a valid date'),
  body('eventLocation').optional({ checkFalsy: true }).isLength({ max: 200 }),
  body('guestCount').optional({ checkFalsy: true }).isInt({ min: 1, max: 100000 }).withMessage('Enter a valid guest count'),
  body('foodPreference').optional({ checkFalsy: true }).isIn(['Vegetarian', 'Non-Vegetarian', 'Mixed']),
  body('cuisinePreferences').optional().isArray(),
  body('services').optional().isArray(),
  body('budget').optional({ checkFalsy: true }).isLength({ max: 100 }),
  body('message').optional({ checkFalsy: true }).isLength({ max: 2000 }),
];
