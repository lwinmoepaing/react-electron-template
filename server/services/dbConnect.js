const fs = require("fs");
const moment = require("moment");
const { LOG_DIRECTORY } = require("../../config");

//require database URL from properties file
// const logPath = `${LOG_DIRECTORY}/db.log`;
// fs.appendFileSync(`${logPath}`, `[${moment().format()}] ${message}\n`);
//export this function and imported by server.js
module.exports = () => {};
