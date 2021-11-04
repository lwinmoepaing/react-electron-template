const knex = require("../services/dbConnect");
const { successResponse, errorResponse } = require("../lib/responseHandler");
const User = require("../model/UserModel");

/**
 * User Lists
 */

module.exports.GET_ALL_USERS = async (req, res) => {
  try {
    const users = await new User().fetchAll({ withRelated: ["role"] });
    res.status(200).json(successResponse(users));
  } catch (e) {
    console.log("error", e);
    res.status(401).json(errorResponse(e));
  }
};
