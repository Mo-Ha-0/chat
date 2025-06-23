const { validationResult, check } = require('express-validator');
const bcrypt = require('bcrypt');
const userService = require('../services/userService');
require('dotenv').config('');
const jwt = require('jsonwebtoken');

const cloudinary = require('../lib/cloudinary');

module.exports = {
  async signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password, ...userData } = req.body;
    try {
      const existingUser = await userService.getUserByEmail(
        userData.email
      );
      if (existingUser) {
        console.error('Username already exists');
        return res
          .status(400)
          .json({ loggedIn: false, status: 'User taken' });
      }
      const SALT = 11;
      const password_hash = await bcrypt.hash(password, SALT);

      const userArray = await userService.createUser({
        ...userData,
        password_hash,
      });

      const user = Array.isArray(userArray)
        ? userArray[0]
        : userArray;

      const { password_hash: passwordHash, ...userInfo } = user;

      const userID = user.id;
      const token = jwt.sign({ userID }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });

      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour in milliseconds
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
      });

      res.status(201).json(userInfo, token);
      return user.id;
    } catch (error) {
      res.status(400).json({ error: error.message, msg: 'bad data' });
    }
  },

  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password, ...userData } = req.body;
    try {
      const user = await userService.getUserByEmail(userData.email);

      if (!user) {
        console.error('User not found');
        return res
          .status(404)
          .json({ loggedIn: false, status: 'User not found' });
      }
      const isValidPassword = await bcrypt.compare(
        password,
        user.password_hash
      );
      if (!isValidPassword) {
        return res.status(400).json('Wrong credentials');
      }

      const userID = user.id;
      const token = jwt.sign({ userID }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });

      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1 hour in milliseconds
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
      });

      const { password_hash: passwordHash, ...userInfo } = user;

      res.status(201).json(userInfo, token);
      return user.id;
    } catch (error) {
      return res.status(400).json({ errors: errors.array() });
    }
  },

  logout(req, res) {
    try {
      res.clearCookie('jwt');
      return res
        .status(200)
        .json({ loggedIn: false, message: 'Logged out Succesfully' });
    } catch (error) {
      return res.status(400).json({ errors: error.message });
    }
  },

  async updateProfile(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { profilePic } = req.body;
      const userId = req.user.id;

      const uploadResponse = await cloudinary.uploader.upload(
        profilePic
      );

      const updatedUser = await userService.updateUser(userId, {
        profilePic: uploadResponse.secure_url,
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errors: error.message });
    }
  },

  checkAuth(req, res) {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      return res.status(400).json({ errors: error.message });
    }
  },
};
