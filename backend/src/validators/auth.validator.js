const { body } = require('express-validator');

module.exports = authValidator = [
  body('fullName')
    .notEmpty()
    .withMessage('Full Name is required')
    .isLength({ min: 4 })
    .withMessage('Full Name must be between [4 - 28] chars')
    .isLength({ max: 28 })
    .withMessage('Full Name must be between [4 - 28] chars'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be between [8 - 28] chars')
    .isLength({ max: 28 })
    .withMessage('Password must be between [8 - 28] chars'),
];
