const http = require("http");
const routeHandler = require("./bookRouter");

// Export the created HTTP server, so it can be used in other parts of the application.
module.exports = http.createServer(routeHandler);
