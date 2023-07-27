const winston = require("winston")
const config = require("./config")

const customLoggingLevels = {
    levels: {
        warn: 0,
        error: 1,
        info: 2,
        debug: 3,
        verbose: 4
    },
    colors: {
        warn: 'yellow',
        error: 'red',
        info: 'grey',
        debug: 'blue',
        verbose: 'green'
    }
};
winston.addColors(customLoggingLevels.colors)

const logger = winston.createLogger({
    levels: customLoggingLevels.levels,
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    ),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

//
// If we're not in production then log to all the levels
// else log only info, error and warn levels
//
if (config.server.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({ level: 'verbose' })); // Set the Console transport to log all levels from verbose and above
} else {
    logger.add(new winston.transports.Console({ level: 'info' })) // Set the Console transport to log all levels from info and above
}

module.exports = logger;
