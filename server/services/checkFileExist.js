const {
  LOG_DIRECTORY,
  DATABASE_DIRECTORY,
  IMAGE_DIRECTORY,
} = require("../../config/index");
const path = require("path");
const fs = require("fs");

module.exports = () => {
  // Check If Exist Directory And Make Directory
  if (!fs.existsSync(LOG_DIRECTORY)) {
    fs.mkdirSync(LOG_DIRECTORY);
  }

  if (!fs.existsSync(DATABASE_DIRECTORY)) {
    fs.mkdirSync(DATABASE_DIRECTORY);
  }

  if (!fs.existsSync(IMAGE_DIRECTORY)) {
    fs.mkdirSync(IMAGE_DIRECTORY);
  }

  const databasePath = path.join(DATABASE_DIRECTORY, "database.db3");
  if (!fs.existsSync(databasePath)) {
    fs.copyFileSync(path.join(__dirname, "data", "database.db3"), databasePath);
  }

  const image404Path = path.join(IMAGE_DIRECTORY, "404.jpg");
  if (!fs.existsSync(image404Path)) {
    fs.copyFileSync(
      path.join(
        __dirname,
        "../",
        "../",
        "public",
        "assets",
        "images",
        "404.jpg"
      ),
      image404Path
    );
  }
};
