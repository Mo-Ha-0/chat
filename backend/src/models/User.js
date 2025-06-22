const { db } = require('../../config/db');

const User = {
  /**
   * Create new User
   * @param {Object} userData - User_Data
   * @returns {Promise<Object>} - new User
   */
  create: async (userData) => {
    return db('users').insert(userData).returning('*');
  },

  /**
   * Get all Users
   * @returns {Promise<Array>} - Array contains all Users
   */
  findAll: async () => {
    return db('users').select('*').orderBy('id', 'asc');
  },

  /**
   * Find User by ID
   * @param {Number} id - User`s ID
   * @returns {Promise<Object>} - User`s Data
   */
  findById: async (id) => {
    return db('users').select('*').where({ id }).first();
  },

  /**
   * Update User`s data
   * @param {Number} id - User`s ID
   * @param {Object} updateData - New Data
   * @returns {Promise<Number>} - Updated rows quantity
   */
  update: async (id, updateData) => {
    return db('users')
      .where({ id })
      .update(updateData)
      .returning('*');
  },

  /**
   * Delete User
   * @param {Number} id - User`s ID
   * @returns {Promise<Number>} - Updated rows quantity
   */
  delete: async (id) => {
    return db('users').where({ id }).delete();
  },

  /**
   * Find User by email
   * @param {String} id - User`s Email
   * @returns {Promise<Number>} - User`s Data
   */
  findByEmail: async (email) => {
    return db('users').where({ email }).first();
  },

  /**
   * Find User by email
   * @param {String} id - User`s Email
   * @returns {Promise<Number>} - User`s Data
   */
  findByUsername: async (username) => {
    return await db('users').where({ username }).first();
  },
};

module.exports = User;
