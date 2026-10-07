const express = require('express');
const testimonialCrud = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', testimonialCrud.getPublished);
router.get('/all', protect, testimonialCrud.getAll);
router.get('/:id', protect, testimonialCrud.getOne);
router.post('/', protect, testimonialCrud.create);
router.put('/:id', protect, testimonialCrud.update);
router.delete('/:id', protect, testimonialCrud.remove);

module.exports = router;
