const express = require('express');
const authController = require('../controllers/auth.controller.js');

const authValidator = require('../validators/auth.validator');
const profileValidator = require('../validators/profile.validator');

const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/signup', authValidator, authController.signup);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.put(
  '/update',
  authMiddleware,
  profileValidator,
  authController.updateProfile
);

router.get('/checkAuth', authMiddleware, authController.checkAuth);

module.exports = router;
