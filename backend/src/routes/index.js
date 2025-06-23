const express = require('express');
const authRouter = require('./auth.route');
const messageRouter = require('./message.route');
const usersRouter = require('./users.route');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/message', messageRouter);
router.use('/users', usersRouter);

module.exports = router;
