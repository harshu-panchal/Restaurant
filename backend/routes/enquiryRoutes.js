const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  createEnquiry,
  getAllEnquiries,
  getEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controllers/enquiryController');
const enquiryValidator = require('../validators/enquiryValidator');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Throttles the public quote-request form to limit spam/abuse without
// requiring a captcha.
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

router.post('/', enquiryLimiter, enquiryValidator, validate, createEnquiry);

router.get('/', protect, getAllEnquiries);
router.get('/:id', protect, getEnquiry);
router.patch('/:id/status', protect, updateEnquiryStatus);
router.delete('/:id', protect, deleteEnquiry);

module.exports = router;
