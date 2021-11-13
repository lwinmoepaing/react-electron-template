const express = require("express");
const router = express.Router();
const passport = require("passport");
const { passUpload } = require("../middleware/imageUpload");
const ImageController = require("../controller/ImageController");

router.get("/:fileName", ImageController.GET_IMAGE_FILE);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  passUpload,
  ImageController.SINGLE_UPLOAD
);

module.exports = router;
