const knex = require("../services/dbConnect");
const RoleModel = require("./RoleModel");
// Defining models
const User = knex.model("User", {
  tableName: "users",
  role() {
    return this.belongsTo(RoleModel);
  },
});

module.exports = User;
