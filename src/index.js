require('dotenv').config(); // Load environment variables from .env file

const server = require("./app");
const config = require("./config");
const redisStore = require("./redisStore");

void (async () => {
    const redisClient = redisStore.getClient();
    await redisClient.connect()
})();

server.listen(config.server.PORT, () => {
    console.info(`Server started at port ${config.server.PORT}`)
})