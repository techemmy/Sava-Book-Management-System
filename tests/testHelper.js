require('dotenv').config() // Load environment variables
const config = require("../src/config");
const { generateBookKey } = require('../src/utils');

const TEST_KEY = config.redis.TEST_KEY_PREFIX;

const cleanupDb = async (redisClient) => {
    /**
     * Deletes all the keys in the database that starts with a base Key
     * @param {object} redisClient - A connected redis instance
     */

    const keys = await redisClient.keys(`${TEST_KEY}:*`)
    for (const key of keys) {
        await redisClient.del(key);
    }
}

const getBooks = async (redisClient) => {
    /**
     * Gets all the items matching a base key
     * @param {string} baseKey - The key that will be used to get hashes
     * @param {object} redisClient - A connected redis instance
     * @returns {object} an array of items with matching key
     */
    const items = []
    const keys = await redisClient.keys(`${TEST_KEY}:*`)
    for (const key of keys) {
        const item = await redisClient.hGetAll(key);
        items.push(item)
    }

    return items

}

const createBook = async (book, redisClient) => {
    const bookKey = generateBookKey(book.ISBN)
    await redisClient.hSet(bookKey, book)
    return book
}

const getBookByISBN = async (ISBN, redisClient) => {
    const bookKey = generateBookKey(ISBN);
    const book = await redisClient.hGetAll(bookKey)
    return book
}

const createBooks = async (books, redisClient) => {
    const booksToCreate = books.map(async book => createBook(book, redisClient))
    await Promise.all(booksToCreate)
}

const searchTermInBooks = (searchTerm, books) => {
    /**
     * Searches a list of books by book title or book author
     * @param {string} searchTerm - the word to look for in the books title or author field
     * @param {object} books - an array of books
     * @returns {object} - the search results
     */
    const searchTermLowercase = searchTerm?.toLowerCase()
    return books.filter(
        book => book.title.toLowerCase().includes(searchTermLowercase)
                || book.author.toLowerCase().includes(searchTermLowercase)
        )
}

module.exports = {
    cleanupDb,
    createBook,
    getBookByISBN,
    getBooks,
    createBooks,
    searchTermInBooks
}