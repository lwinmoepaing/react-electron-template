exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("unique_name").notNullable();
    table.string("user_name").notNullable();
    table.string("password").notNullable();
    table.string("phone_no").notNullable();
    table.string("address");
    table
      .string("profile_picture")
      .notNullable()
      .defaultsTo("default_profile.png");
    table
      .integer("role_id")
      .references("id")
      .inTable("roles")
      .notNullable()
      .onDelete("CASCADE")
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
