require("dotenv").config(); // Load environment variables from .env file

const server = require("./app");
const config = require("./config");
const redisStore = require("./redisStore");

(async () => {
  const redisClient = redisStore.getClient();
  await redisClient.connect();
})();

server.listen(config.server.PORT, () => {
  console.log(`Server started at port ${config.server.PORT}`);
});
