const path = require("path");
const fs = require("fs");
const {
  LOG_DIRECTORY,
  DATABASE_DIRECTORY,
  IMAGE_DIRECTORY,
  IS_PRODUCTION,
} = require("../../config/index");

module.exports = () => {
  // Check If Exist Directory And Make Directory
  if (!fs.existsSync(LOG_DIRECTORY)) {
    fs.mkdirSync(LOG_DIRECTORY);
  }

  if (!fs.existsSync(DATABASE_DIRECTORY)) {
    fs.mkdirSync(DATABASE_DIRECTORY);
  }

  if (!IS_PRODUCTION && !fs.existsSync(path.join(__dirname, "../../storage"))) {
    fs.mkdirSync(path.join(__dirname, "../../storage"));
  }

  if (!fs.existsSync(IMAGE_DIRECTORY)) {
    fs.mkdirSync(IMAGE_DIRECTORY);
  }

  const databasePath = path.join(DATABASE_DIRECTORY, "database.db3");
  if (!fs.existsSync(databasePath)) {
    fs.copyFileSync(path.join(__dirname, "data", "database.db3"), databasePath);
  }

  const necessaryImages = ["404.jpg", "profile_picture.png"];

  necessaryImages.forEach((image) => {
    const imagePath = path.join(IMAGE_DIRECTORY, image);
    if (!fs.existsSync(imagePath)) {
      fs.copyFileSync(
        path.join(__dirname, "../", "../", "public", "assets", "images", image),
        imagePath
      );
    }
  });
};
