/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id').primary();
    table
      .integer('sender_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('receiver_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.text('text');
    table.string('image');
    table.timestamps(true, true); // created_at, updated_at with timestamps
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('messages');
};
