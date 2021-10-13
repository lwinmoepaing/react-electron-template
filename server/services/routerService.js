const fs = require("fs");
const path = require("path");
const config = require("../../config");

/**
 * @desc:
 * @param {app} express_app callback
 */
module.exports = (app) => {
  const apiRouterFiles = fs.readdirSync(path.join(__dirname, "../", "router"));
  apiRouterFiles.forEach((route) => {
    const extensionJs = getExtension(route);
    const firstName = route.split(".")[0];
    const routeName = `${config.API_VERSION}/${
      firstName === "index" ? "" : firstName
    }`;
    if (extensionJs === "js") {
      app.use(routeName, require(`../router/${route}`));
    }
  });
};

function getExtension(route) {
  return route.split(".")[route.split(".").length - 1];
}
