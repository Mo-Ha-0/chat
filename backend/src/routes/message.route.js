const express = require('express');
const messageController = require('../controllers/message.controller.js');

const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/:id', authMiddleware, messageController.getMessages);
router.post(
  '/send/:id',
  authMiddleware,
  messageController.sendMessage
);

module.exports = router;
