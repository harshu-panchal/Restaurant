const Service = require('../models/Service');
const crudFactory = require('../utils/crudFactory');

module.exports = crudFactory(Service, { slugSource: 'title' });
