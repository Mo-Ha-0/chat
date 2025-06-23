const express = require('express');
const Router = require('./routes');
const cookieParser = require('cookie-parser');
require('dotenv').config('');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', Router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});
