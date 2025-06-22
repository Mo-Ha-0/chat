const User = require('../models/User');

const userService = {
  createUser: async (userData) => {
    return await User.create(userData);
  },

  getAllUsers: async () => {
    return await User.findAll();
  },

  getUserById: async (id) => {
    return await User.findById(id);
  },

  updateUser: async (id, updateData) => {
    return await User.update(id, updateData);
  },

  deleteUser: async (id) => {
    return await User.delete(id);
  },

  getUserByEmail: async (email) => {
    return await User.findByEmail(email);
  },
};

module.exports = userService;
