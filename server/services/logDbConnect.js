const { DATABASE_DIRECTORY } = require("../../config");
const path = require("path");

const connection = require("knex")({
  client: "sqlite3",
  connection: {
    filename: path.join(DATABASE_DIRECTORY, "logdatabase.db3"),
  },
});

const BookShelf = require("bookshelf")(connection);
BookShelf.plugin(["visibility", "pagination"]);

module.exports = BookShelf;
