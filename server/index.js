const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");
const routerEndPoints = require("express-list-endpoints");
const server = require("./bin/www");
const { LOG_DIRECTORY, DATABASE_DIRECTORY } = require("../config/index");
const fs = require("fs");

// Check If Exist Directory And Make Directory
if (!fs.existsSync(LOG_DIRECTORY)) {
  fs.mkdirSync(LOG_DIRECTORY);
}

if (!fs.existsSync(DATABASE_DIRECTORY)) {
  fs.mkdirSync(DATABASE_DIRECTORY);
}

const databasePath = path.join(DATABASE_DIRECTORY, "database.db3");
if (!fs.existsSync(databasePath)) {
  console.log("------ DataBase Path --------", databasePath);
  fs.copyFileSync(path.join(__dirname, "data", "database.db3"), databasePath);
}

// Finally Handle All UnExpected Errors
const errorHandler = require("./lib/errorHandler");

// Importing Services
const routerService = require("./services/routerService");
const connectDb = require("./services/dbConnect");
const Logger = require("./services/logger");

// Dotenv (.env) Configuration
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// Require Locale Passport Config
require("./services/passport")(passport);
app.use(passport.initialize());

// Connect To Database
// connectDb();

/**
 * HTTP request logger middleware for node.js
 * @doc : https://github.com/expressjs/morgan#readme
 */
if (process.env.ENV !== "PRODUCTION") {
  app.use(morgan("tiny"));
}
// else {
app.use(Logger);
app.use(Logger.notFoundLog);
app.use(Logger.errorLog);
// }

/**
 *  Express.js security with HTTP headers
 *  It's not a silver bullet, but it can help!
 *  @doc : https://helmetjs.github.io/
 */
app.use(helmet());

/**
 * For Cross Origin Resource Sharing
 * @doc : https://github.com/expressjs/cors#readme
 */
app.use(cors());

/**
 * Node.js body parsing middleware.
 * @doc : https://github.com/expressjs/body-parser#readme
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static Path
app.use(express.static("./public"));

/**
 * Testing Initial API ROUTE
 * @desc : For only testing
 * @return { JSON }
 */
app.get("/api", (req, res) => {
  res.status(201).json({
    message: "Api Testing",
    author: "Lwin Moe Paing",
  });
});

/**
 * SET All ROUTERS
 * @desc : Using Express Middleware For Routing
 * @directories : '/router/web/*' and '/router/api/*'
 */
routerService(app);

/**
 * 404 Handler
 * @desc : Return 404 Response
 */
app.use("*", (req, res) =>
  res.status(404).json({ message: "Request Not Found 404", statusCode: 404 })
);

/**
 * Final Manage Error Exception
 * @desc : Finally Response Message
 * @return { JSON }
 */
app.use(errorHandler);

/**
 * Outut Console to our all route lists
 */
console.log(routerEndPoints(app));

module.exports = () => {
  server(app);
  return server;
};
