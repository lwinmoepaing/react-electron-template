exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();

    table.string("unique_name").notNullable().unique();

    table.string("user_name").notNullable();

    table.string("password").notNullable();

    table.string("phone_no").notNullable().index();

    table.text("note");

    table.string("address");

    table.integer("fixed_salary").defaultsTo(0).notNullable();

    table
      .string("profile_picture")
      .notNullable()
      .defaultsTo("profile_picture.png");

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
