const express = require("express");
const logController = require("../controller/LogController");
const router = express.Router();

router.get("/user_log", logController.GET_ALL_USER_LOG);

module.exports = router;
