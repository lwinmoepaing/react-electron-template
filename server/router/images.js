const express = require("express");
const { IMAGE_DIRECTORY } = require("../../config");
const path = require("path");
const fs = require("fs");
const router = express.Router();

router.get("/:fileName", (req, res) => {
  console.log("req.params.fileName", req.params.fileName);
  const imagePath = path.join(IMAGE_DIRECTORY, req.params.fileName);

  if (!fs.existsSync(imagePath)) {
    return res.sendFile(path.join(IMAGE_DIRECTORY, "404.jpg"));
  }

  return res.sendFile(path.join(IMAGE_DIRECTORY, image));
});
module.exports = router;
