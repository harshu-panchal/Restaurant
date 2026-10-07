const express = require('express');

const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/menu', require('./menuRoutes'));
router.use('/services', require('./serviceRoutes'));
router.use('/packages', require('./packageRoutes'));
router.use('/gallery', require('./galleryRoutes'));
router.use('/testimonials', require('./testimonialRoutes'));
router.use('/enquiries', require('./enquiryRoutes'));
router.use('/settings', require('./settingsRoutes'));
router.use('/upload', require('./uploadRoutes'));
router.use('/dashboard', require('./dashboardRoutes'));

module.exports = router;
