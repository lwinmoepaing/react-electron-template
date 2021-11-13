const express = require("express");
const roleController = require("../controller/RoleController");
const router = express.Router();

router.get("/", roleController.GET_ALL_ROLES);

module.exports = router;
