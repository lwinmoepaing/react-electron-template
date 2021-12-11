const knex = require("../services/logDbConnect");
// Defining models
const UserLog = knex.model("UserLog", {
  tableName: "user_action_logs",
});

module.exports = UserLog;
