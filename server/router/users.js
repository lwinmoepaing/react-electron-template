const express = require("express");
const userController = require("../controller/UserController");
const router = express.Router();

/**
 * @desc : to Login from User Request
 * @route /api/v{Num}/auth/login
 */

router.get("/", userController.GET_ALL_USERS);
router.get("/:id", userController.GET_USER_BY_ID);

module.exports = router;
