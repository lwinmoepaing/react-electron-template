const express = require("express");
const passport = require("passport");
const userController = require("../controller/UserController");
const router = express.Router();

router.get("/", userController.GET_ALL_USERS);
router.get("/total_count", userController.GET_TOTAL_COUNT);
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  userController.GET_ME
);
router.get("/:id", userController.GET_USER_BY_ID);
router.post("/login", userController.LOGIN_USER);
router.post("/register", userController.CREATE_USER);

module.exports = router;
