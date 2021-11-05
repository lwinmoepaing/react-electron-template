exports.up = function (knex) {
  return knex.schema.createTable("roles", (table) => {
    table.increments();

    table.varchar("name", 200).notNullable();

    table.string("mm_name").notNullable();

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("roles");
};
