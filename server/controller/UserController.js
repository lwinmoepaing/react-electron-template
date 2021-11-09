const knex = require("../services/dbConnect");
const { successResponse, errorResponse } = require("../lib/responseHandler");
const User = require("../model/UserModel");

const userDefaultColumns = [
  "id",
  "user_name",
  "role_id",
  "phone_no",
  "note",
  "address",
  "profile_picture",
];

/**
 * User Lists
 */

module.exports.GET_ALL_USERS = async (req, res) => {
  try {
    const users = await new User().fetchAll({
      withRelated: ["role", "permissions"],
      columns: [...userDefaultColumns],
    });
    res.status(200).json(successResponse(users));
  } catch (e) {
    console.log("error", e);
    res.status(401).json(errorResponse(e));
  }
};

module.exports.GET_USER_BY_ID = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await new User({ id }).fetch({
      withRelated: ["role", "permissions"],
      columns: [...userDefaultColumns],
    });
    res.status(200).json(successResponse(users));
  } catch (e) {
    console.log("error", e);
    res.status(401).json(errorResponse(e));
  }
};
