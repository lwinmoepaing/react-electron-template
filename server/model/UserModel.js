const knex = require("../services/dbConnect");
const RoleModel = require("./RoleModel");
const PermissionModel = require("./PermissionModel");
// Defining models
const User = knex.model("User", {
  tableName: "users",
  role() {
    return this.belongsTo(RoleModel);
  },

  permissions() {
    return this.belongsToMany(PermissionModel);
  },
});

module.exports = User;
