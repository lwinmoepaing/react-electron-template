// All Backups Seeder
// After Updating Database Versions
const { DATABASE_DIRECTORY } = require("../../config");
const path = require("path");

const connection = require("knex")({
  client: "sqlite3",
  connection: {
    filename: path.join(DATABASE_DIRECTORY, "backup_database.db3"),
  },
});

const BackupDb = require("bookshelf")(connection);

const backupSeeding = (callback) => {
  // Example UserSeeder

  // Permission Seeder

  // After All Seeding
  if (callback) callback();
};

module.exports = backupSeeding;
