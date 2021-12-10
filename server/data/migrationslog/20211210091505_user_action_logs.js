exports.up = function (knex) {
  return knex.schema.createTable("user_action_logs", (table) => {
    table.increments();

    table.integer("user_id", 255).notNullable().index();

    table.varchar("user_name", 255).notNullable();

    table.varchar("action_type", 255).notNullable().index();

    table.integer("object_id", 150).notNullable();

    table.varchar("table_name", 255).notNullable().index();

    table.text("attachment", 255).notNullable().default('{message:"",data:{}}'); // Json

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_action_logs");
};
