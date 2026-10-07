const Package = require('../models/Package');
const crudFactory = require('../utils/crudFactory');

module.exports = crudFactory(Package, { slugSource: 'title' });
