const http = require('http');
const routeHandler = require('./routeHandler');

module.exports = http.createServer(routeHandler)
