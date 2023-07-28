require('dotenv').config(); // Load environment variables from .env file

const server = require("./app");
const config = require("./config");
const redisStore = require("./redisStore");
const logger = require("./logger");

(async () => {
    const redisClient = redisStore.getClient();
    await redisClient.connect()
})();

server.listen(config.server.PORT, () => {
    logger.info(`Server started at port ${config.server.PORT}`)
})