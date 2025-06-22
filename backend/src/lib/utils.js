const jsonwebtoken = require('jsonwebtoken');

const generateToken = () => {
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 3600000, // 1 hour in milliseconds
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== development,
  });

  return token;
};
