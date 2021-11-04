const db = require("../services/dbConnect");
const { successResponse } = require("../lib/responseHandler");

/**
 * User Lists
 */

module.exports.GET_ALL_USERS = async (req, res) => {
  const users = db.select().from("users");
  res.status(200).json(users);
};
