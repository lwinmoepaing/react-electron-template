exports.up = function (knex) {
  return knex.schema.createTable("permissions", (table) => {
    table.increments();

    table.varchar("name", 150).notNullable();

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("permissions");
};
