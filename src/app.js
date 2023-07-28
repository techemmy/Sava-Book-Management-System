const http = require('http');
const routeHandler = require('./bookRouter');

module.exports = http.createServer(routeHandler)
