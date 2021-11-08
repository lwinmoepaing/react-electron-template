exports.up = function (knex) {
  return knex.schema.createTable("permissions_users", (table) => {
    table.integer("permission_id").unsigned().references("permissions.id");
    table.integer("user_id").unsigned().references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("permissions_users");
};
