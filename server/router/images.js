const express = require("express");
const { IMAGE_DIRECTORY } = require("../../config");
const path = require("path");
const fs = require("fs");
const { errorResponse } = require("../lib/responseHandler");
const router = express.Router();

router.get("/:fileName", (req, res) => {
  console.log("req.params.fileName", req.params.fileName);
  try {
    const imagePath = path.join(IMAGE_DIRECTORY, req.params.fileName);
    if (!fs.existsSync(imagePath)) {
      return res.sendFile(path.join(IMAGE_DIRECTORY, "404.jpg"));
    }

    return res.sendFile(path.join(IMAGE_DIRECTORY, req.params.fileName));
  } catch (e) {
    return res
      .status(400)
      .json(errorResponse(new Error("Image Not Found"), null));
  }
});
module.exports = router;
