const express = require('express');
const authRouter = require('./routes/auth.route.js');
require('dotenv').config('');

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});
