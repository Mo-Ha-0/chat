// import express from 'express';
// import authRouter from './routes/auth.route.js';

const express = require('express');
const authRouter = require('./routes/auth.route.js');

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);

app.listen(5001, () => {
  console.log('app is listening on port 5001');
});
