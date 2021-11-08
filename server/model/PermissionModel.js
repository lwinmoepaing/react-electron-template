const knex = require("../services/dbConnect");
const UserModel = require("./UserModel");

// Defining models
const Permission = knex.model("Permission", {
  tableName: "permissions",
  hidden: [
    "created_at",
    "updated_at",
    "_pivot_user_id",
    "_pivot_permission_id",
  ],

  users() {
    return this.belongsToMany(UserModel);
  },
});

module.exports = Permission;
