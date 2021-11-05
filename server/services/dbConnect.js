const { DATABASE_DIRECTORY } = require("../../config");
const knex = require("knex");
const path = require("path");

const connection = require("knex")({
  client: "sqlite3",
  connection: {
    filename: path.join(DATABASE_DIRECTORY, "database.db3"),
  },
});

module.exports = require("bookshelf")(connection);
