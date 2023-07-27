const deleteAllMatchingKeys = async (baseKey, redisClient) => {
    /**
     * Deletes all the keys in the database that starts with the baseKey
     * @param {string} baseKey - The key that will be used to get hashes
     * @param {object} redisClient - A connected redis instance
     */

    const keys = await redisClient.keys(`${baseKey}:*`)
    for (const key of keys) {
        await redisClient.del(key);
    }
}

module.exports = {
    deleteAllMatchingKeys
}