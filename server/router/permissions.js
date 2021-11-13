const express = require("express");
const permissionController = require("../controller/PermissionController");
const router = express.Router();

router.get("/", permissionController.GET_ALL_PERMISSIONS);

module.exports = router;
