const path = require("path");
const dotenv = require("dotenv");
const electron = require("electron");

dotenv.config({ path: path.join(__dirname, "../", ".env") });
const isProduction =
  // true
  process.env.ENV === "PRODUCTION" || !!electron.app.isPackaged;
const userDataPath = (electron.app || electron.remote.app).getPath("userData");
// We'll use the `configName` property to set the file name and path.join to bring it all together as a string
const USER_DATA_DIRECTORY = path.join(userDataPath);
const LOG_DIRECTORY = isProduction
  ? path.join(USER_DATA_DIRECTORY, "logs")
  : path.join(__dirname, "../", "server", "logs");
const DATABASE_DIRECTORY = isProduction
  ? path.join(USER_DATA_DIRECTORY, "databases")
  : path.join(__dirname, "../", "server", "data");
const IMAGE_DIRECTORY = isProduction
  ? path.join(USER_DATA_DIRECTORY, "images")
  : path.join(__dirname, "../", "storage", "images");

console.log("LOG_DIRECTORY", LOG_DIRECTORY);
console.log("DATABASE_DIRECTORY", DATABASE_DIRECTORY);
console.log("IMAGE_DIRECTORY", IMAGE_DIRECTORY);

// const env = process.env.NODE_ENV || 'development'
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

const config = {
  API_VERSION: "/api",
  API_URL: "http://localhost:5050/api",
  API_KEY: process.env.API_KEY,
  JWT_SECRET,
  DEFAULT_PAGINATE_LIMIT: 10,
  LOG_DIRECTORY,
  USER_DATA_DIRECTORY,
  DATABASE_DIRECTORY,
  IMAGE_DIRECTORY,
  IS_PRODUCTION: isProduction,
};

module.exports = config;
