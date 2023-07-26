const config = require("./config")
const redisStore = require("./redisStore")
const { generateBookKey } = require("./utils")

const getBooks = async () => {
    const client = redisStore.getClient()
    const books = []
    const keys = await client.keys(`${config.redis.KEY_PREFIX}:*`)
    for (const key of keys) {
        const bookData = await client.hGetAll(key);
        books.push(bookData)
    }
    return books
}

const getBookByISBN = async (ISBN) => {
    const client = redisStore.getClient()
    const bookKey = generateBookKey(ISBN);
    const book = await client.hGetAll(bookKey)
    return book
}

const createBook = async (book) => {
    const client = redisStore.getClient()
    const bookKey = generateBookKey(book.ISBN)
    await client.hSet(bookKey, book)
    return book
}

const updateBookByISBN = async (ISBN, bookUpdate) => {
    const client = redisStore.getClient()
    const bookKey = generateBookKey(ISBN)
    await client.hSet(bookKey, bookUpdate)
    return bookUpdate
}

const deleteBookByISBN = async (ISBN) => {
    const client = redisStore.getClient()
    const bookKey = generateBookKey(ISBN)
    await client.del(bookKey)
    return ISBN
}

module.exports = {
    getBooks,
    createBook,
    getBookByISBN,
    updateBookByISBN,
    deleteBookByISBN
}