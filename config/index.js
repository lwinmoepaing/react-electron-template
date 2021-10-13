const path = require("path");
const dotenv = require("dotenv");
const electron = require("electron");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const userDataPath = (electron.app || electron.remote.app).getPath("userData");
// We'll use the `configName` property to set the file name and path.join to bring it all together as a string
const USER_DATA_DIRECTORY = path.join(userDataPath);
const LOG_DIRECTORY = path.join(USER_DATA_DIRECTORY, "logs");

// const env = process.env.NODE_ENV || 'development'
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

const config = {
  API_VERSION: "/api",
  API_KEY: process.env.API_KEY,
  JWT_SECRET,
  DEFAULT_PAGINATE_LIMIT: 10,
  LOG_DIRECTORY,
  USER_DATA_DIRECTORY,
};

module.exports = config;
