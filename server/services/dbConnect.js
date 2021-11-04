const fs = require("fs");
const moment = require("moment");
const { DATABASE_DIRECTORY } = require("../../config");
const knex = require("knex");
const path = require("path");
const connection = knex({
  client: "sqlite3",
  connection: {
    filename: path.join(DATABASE_DIRECTORY, "database.db3"),
  },
});
// require database URL from properties file
// const logPath = `${LOG_DIRECTORY}/db.log`;
// fs.appendFileSync(`${logPath}`, `[${moment().format()}] ${message}\n`);
// export this function and imported by server.js
module.exports = () => {};
