const winston = require("winston");
const config = require("./config");

// Define custom logging levels and their associated colors for use in the logger.
const customLoggingLevels = {
  levels: {
    warn: 0,
    error: 1,
    info: 2,
    debug: 3,
    verbose: 4,
  },
  colors: {
    warn: "yellow",
    error: "red",
    info: "grey",
    debug: "blue",
    verbose: "green",
  },
};

winston.addColors(customLoggingLevels.colors);

const logger = winston.createLogger({
  levels: customLoggingLevels.levels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple(),
  ),
  transports: [
    // Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    // Write all logs with importance level of `info` or less to `combined.log`
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// Set up different logging configurations based on the environment.
if (config.server.NODE_ENV !== "production") {
  // If we're not in production, log all levels from 'verbose' and above to the console.
  logger.add(new winston.transports.Console({ level: "verbose" }));
} else {
  // If we're in production, log all levels from 'info' and above to the console.
  logger.add(new winston.transports.Console({ level: "info" }));
}

module.exports = logger;
