const knex = require("../services/dbConnect");
const UserModel = require("./UserModel");

// Defining models
const Role = knex.model("Role", {
  tableName: "roles",
  users() {
    return this.hasMany(UserModel);
  },
});

module.exports = Role;
