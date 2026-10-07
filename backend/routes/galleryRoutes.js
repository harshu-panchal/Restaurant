const express = require('express');
const galleryCrud = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', galleryCrud.getAll);
router.get('/:id', galleryCrud.getOne);
router.post('/', protect, galleryCrud.create);
router.put('/:id', protect, galleryCrud.update);
router.delete('/:id', protect, galleryCrud.remove);

module.exports = router;
