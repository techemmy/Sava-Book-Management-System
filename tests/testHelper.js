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

const getAllItemsMatchingKey = async (baseKey, redisClient) => {
    /**
     * Gets all the items matching the baseKey
     * @param {string} baseKey - The key that will be used to get hashes
     * @param {object} redisClient - A connected redis instance
     * @returns {object} an array of items with matching key
     */
    const items = []
    const keys = await redisClient.keys(`${baseKey}:*`)
    for (const key of keys) {
        const item = await redisClient.hGetAll(key);
        items.push(item)
    }

    return items

}

module.exports = {
    deleteAllMatchingKeys,
    getAllItemsMatchingKey
}