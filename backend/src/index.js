const express = require('express');
const Router = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { app, server } = require('../config/socket');
require('dotenv').config('');

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api', Router);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});
