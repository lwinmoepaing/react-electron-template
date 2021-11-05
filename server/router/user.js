const express = require("express");
const { successResponse } = require("../lib/responseHandler");
const userController = require("../controller/UserController");
const router = express.Router();

/**
 * @desc : to Login from User Request
 * @route /api/v{Num}/auth/login
 */

router.get("/", userController.GET_ALL_USERS);

module.exports = router;
