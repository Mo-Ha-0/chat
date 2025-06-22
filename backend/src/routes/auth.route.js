const express = require('express');
const authController = require('../controllers/auth.controller.js');

const authValidator = require('../validators/authValidatro');

const router = express.Router();

router.post('/signup', authValidator, authController.signup);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

module.exports = router;
