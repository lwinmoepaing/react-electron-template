const http = require("http");
const fs = require("fs");

// module.exports = () => {
// Create Logs Directory If Not Exist

module.exports = (app, cb) => {
  const port = normalizePort(process.env.SERVER_PORT || "3000");
  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);
  server.listen(port, () => {
    const Console = console;
    Console.log(
      `Express server listening on port localhost:${server.address().port}`
    );
  });
  server.on("error", onError);
  server.on("listening", onListening);

  /**
   * Normalize a port into a number, string, or false.
   */
  function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    const Console = console;
    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        Console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        Console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    const addr = server.address();
    const Console = console;
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    Console.log(`Listening on ${bind}`);

    if (cb) cb();
  }
  // };
};
