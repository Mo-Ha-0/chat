const { db } = require('../../config/db');

module.exports = {
  async getUsersForSidebar(req, res) {
    try {
      const loggedInUserId = req.user.id;

      //   const users = await db('users')
      //     .whereNot('id', loggedInUserId)
      //     .select('id', 'name', 'email', 'username');
      const columns = await db('users')
        .columnInfo()
        .then((info) =>
          Object.keys(info).filter((col) => col !== 'password_hash')
        );
      const users = await db('users')
        .select(columns)
        .whereNot('id', loggedInUserId);

      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Error fetching users for sidebar' });
    }
  },
};
