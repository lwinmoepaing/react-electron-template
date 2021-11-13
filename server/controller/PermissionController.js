const DB = require("../services/dbConnect");
const { successResponse, errorResponse } = require("../lib/responseHandler");
const Permission = require("../model/PermissionModel");
// Self Import

module.exports.GET_ALL_PERMISSIONS = async (req, res) => {
  try {
    const permissions = await new Permission().fetchAll({});
    res.status(200).json(successResponse(permissions));
  } catch (e) {
    console.log("error", e);
    res.status(401).json(errorResponse(e));
  }
};
