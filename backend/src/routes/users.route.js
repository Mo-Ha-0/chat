const express = require('express');
const usersController = require('../controllers/users.controller.js');

const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, usersController.getUsersForSidebar);

module.exports = router;
