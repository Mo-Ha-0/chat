const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  const saltRounds = 10;
  const users = [];

  for (let i = 0; i < 100; i++) {
    const password = await bcrypt.hash('Password123', saltRounds);

    users.push({
      email: faker.internet.email().toLowerCase(),
      fullName: faker.person.fullName().slice(0, 28),
      password_hash: password,
      profilePic: `https://randomuser.me/api/portraits/men/${i}.jpg`,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  await knex('users').insert(users);
};
