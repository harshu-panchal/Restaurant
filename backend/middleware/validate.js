const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

// Run after an express-validator chain to turn collected errors into a
// single ApiError the centralized error handler already knows how to format.
module.exports = function validate(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const details = result.array().map((e) => e.msg);
    return next(new ApiError(400, 'Validation failed', details));
  }
  next();
};
