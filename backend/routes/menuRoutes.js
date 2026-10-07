const express = require('express');
const { categoryCrud, itemCrud, getPublicMenu, getFeaturedItems } = require('../controllers/menuController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public
router.get('/', getPublicMenu);
router.get('/featured', getFeaturedItems);
router.get('/categories', categoryCrud.getAll);

// Admin
router.post('/categories', protect, categoryCrud.create);
router.get('/categories/:id', protect, categoryCrud.getOne);
router.put('/categories/:id', protect, categoryCrud.update);
router.delete('/categories/:id', protect, categoryCrud.remove);

router.get('/items', protect, itemCrud.getAll);
router.get('/items/:id', protect, itemCrud.getOne);
router.post('/items', protect, itemCrud.create);
router.put('/items/:id', protect, itemCrud.update);
router.delete('/items/:id', protect, itemCrud.remove);

module.exports = router;
