const express = require('express');
const packageCrud = require('../controllers/packageController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', packageCrud.getAll);
router.get('/:id', packageCrud.getOne);
router.post('/', protect, packageCrud.create);
router.put('/:id', protect, packageCrud.update);
router.delete('/:id', protect, packageCrud.remove);

module.exports = router;
