const knex = require('knex');
const { Pool } = require('pg');
const config = require('../knexfile');

const db = knex(config['development']);

const pool = new Pool({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
});

module.exports = { db, pool };
