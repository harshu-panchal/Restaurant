const express = require('express');
const { login, logout, me } = require('../controllers/authController');
const { loginValidator } = require('../validators/authValidator');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', loginValidator, validate, login);
router.post('/logout', logout);
router.get('/me', protect, me);

module.exports = router;
