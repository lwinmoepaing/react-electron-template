const knex = require("../services/dbConnect");
// Defining models
const User = knex.model("User", {
  tableName: "user_action_logs",
});

module.exports = User;
