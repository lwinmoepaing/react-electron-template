const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const moment = require("moment-timezone");
const { LOG_DIRECTORY } = require("../../config");

const accessLogStream = (fileName) => {
  const customLogDir = path.join(
    LOG_DIRECTORY,
    moment().tz("Asia/Yangon").format("YYYY-MM-DD")
  );

  if (!fs.existsSync(customLogDir)) {
    fs.mkdirSync(customLogDir);
  }

  return fs.createWriteStream(path.join(customLogDir, `${fileName}`), {
    flags: "a",
  });
};

morgan.token("date", () => {
  return moment().tz("Asia/Yangon").format("YYYY-MM-DD HH:mm:ss");
});

morgan.token("user", (req) => {
  return req.user ? `UserId:${req.user.id} Name:"${req.user.name}"` : '"Guest"';
});

morgan.format(
  "loggerCustomFormat",
  '[:date] :method ":url", Status :status, ContentLength :res[content-length] - :response-time ms, :user'
);

module.exports = morgan("loggerCustomFormat", {
  format: "default",
  stream: accessLogStream("access.log"),
  skip: function (req, res) {
    return res.statusCode > 400;
  },
});

/**
 * Not Found Log'll write on 404.log
 *
 */
module.exports.notFoundLog = morgan("loggerCustomFormat", {
  format: "default",
  stream: accessLogStream("404.log"),
  skip: function (req, res) {
    return res.statusCode !== 404;
  },
});

/**
 * Output Only Error Logs.
 */
module.exports.errorLog = morgan("loggerCustomFormat", {
  format: "default",
  stream: accessLogStream("error.log"),
  skip: function (req, res) {
    return res.statusCode < 400 || res.statusCode === 404;
  },
});
