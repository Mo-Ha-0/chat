const { body } = require('express-validator');

module.exports = profileValidator = [
  body('profilePic').notEmpty().withMessage('Full Name is required'),
];
