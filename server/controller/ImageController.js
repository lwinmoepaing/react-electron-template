const DB = require("../services/dbConnect");
const { IMAGE_DIRECTORY } = require("../../config");
const path = require("path");
const Joi = require("@hapi/joi");
const fs = require("fs");
const { MANAGE_ERROR_MESSAGE } = require("../lib/helper");
const { errorResponse, successResponse } = require("../lib/responseHandler");

// Control Respond Image File if Exist
// If not 404 image 'll response
module.exports.GET_IMAGE_FILE = (req, res) => {
  try {
    const imagePath = path.join(IMAGE_DIRECTORY, req.params.fileName);
    if (!fs.existsSync(imagePath)) {
      // if not found image, always 404 image
      return res.sendFile(path.join(IMAGE_DIRECTORY, "404.jpg"));
    }

    return res.sendFile(path.join(IMAGE_DIRECTORY, req.params.fileName));
  } catch (e) {
    return res
      .status(400)
      .json(errorResponse(new Error("Image Not Found"), null));
  }
};

// For Testing Single Upload Image
module.exports.SINGLE_UPLOAD = (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Invalid File");
    }
    const imageFilePath = `/images/${req.file.filename}`;
    res.status(200).json(successResponse(imageFilePath));
  } catch (e) {
    return res.status(400).json(errorResponse(e));
  }
};
