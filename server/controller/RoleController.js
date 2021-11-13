const Role = require("../model/RoleModel");
const { errorResponse, successResponse } = require("../lib/responseHandler");

module.exports.GET_ALL_ROLES = async (req, res) => {
  try {
    const roles = await new Role().fetchAll();
    return res.status(200).json(successResponse(roles));
  } catch (e) {
    return res.status(400).json(errorResponse(e));
  }
};
