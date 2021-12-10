module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: __dirname + "/server/data/logdatabase.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + "/server/data/migrationslog",
    },
    seeds: {
      directory: __dirname + "/server/data/seedslog",
    },
  },
};
