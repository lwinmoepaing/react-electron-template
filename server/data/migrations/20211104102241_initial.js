
exports.up = function(knex) {
  return knex.schema.createTable('initial', (table) => {
      table.increments();
      table.varchar('key', 255).notNullable();
      table.varchar('type', 255).notNullable();
      table.text('value', 255).notNullable();
      table.timestamps(true, true);
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('initial');
};
