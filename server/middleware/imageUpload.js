const multer = require("multer");
const path = require("path");
const { uuid } = require("uuidv4");
const { IMAGE_DIRECTORY } = require("../../config");
const { errorResponse } = require("../lib/responseHandler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, IMAGE_DIRECTORY);
  },
  filename: function (req, file, cb) {
    const fileName = `${uuid()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    !file.mimetype.includes("jpeg") &&
    !file.mimetype.includes("jpg") &&
    !file.mimetype.includes("png") &&
    !file.mimetype.includes("gif")
  ) {
    return cb(null, false, new Error("Only images are allowed"));
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter }).single("image");

module.exports.upload = upload;

module.exports.passUpload = (req, res, next) => {
  upload(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        throw new Error("Something Wrong When Uploading");
      } else if (err) {
        // An unknown error occurred when uploading.
        throw err;
      }

      next();
    } catch (e) {
      res.status(400).json(errorResponse(e));
    }
  });
};
