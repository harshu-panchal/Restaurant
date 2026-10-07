const express = require('express');
const serviceCrud = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', serviceCrud.getAll);
router.get('/:id', serviceCrud.getOne);
router.post('/', protect, serviceCrud.create);
router.put('/:id', protect, serviceCrud.update);
router.delete('/:id', protect, serviceCrud.remove);

module.exports = router;
