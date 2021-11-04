module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: __dirname + "/server/data/database.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + "/server/data/migrations",
    },
    seeds: {
      directory: __dirname + "/server/data/seeds",
    },
  },
};
