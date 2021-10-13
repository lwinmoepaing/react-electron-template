const express = require("express");
const { successResponse } = require("../lib/responseHandler");
const router = express.Router();

/**
 * @desc : to Login from User Request
 * @route /api/v{Num}/auth/login
 */

router.get("/hehe", (req, res) => {
  return res.status(200).json(successResponse(null, "Success Hehe"));
});

module.exports = router;
