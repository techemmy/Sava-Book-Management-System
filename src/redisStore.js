const redis = require("redis");
const config = require("./config")

const client = redis.createClient({
    host: config.redis.HOST,
    port: config.redis.PORT,
})

client.on('connect', function () {
    console.log('Redis Connected!');
});

client.on('error', function () {
    console.log('Error connecting redis');
});

module.exports = {
    /**
     * Get the application's connected Redis client instance.
     *
     * @returns {Object} - a connected node_redis client instance.
     */
    getClient: () => client,
}
