const config = require("./config")
const redisStore = require("./redisStore")
const { generateBookKey } = require("./utils")

/**
 * Retrieves all books stored in Redis.
 *
 * @returns {Promise<Array>} - A Promise that resolves to an array of book objects.
 */
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

/**
 * Retrieves a book from Redis using its ISBN (International Standard Book Number).
 *
 * @param {string} ISBN - The ISBN of the book to retrieve.
 * @returns {Promise<Object>} - A Promise that resolves to the book object with the given ISBN.
 */
const getBookByISBN = async (ISBN) => {
    const client = redisStore.getClient()
    const bookKey = generateBookKey(ISBN);
    const book = await client.hGetAll(bookKey)
    return book
}

/**
 * Creates a new book in Redis.
 *
 * @param {Object} book - The details of the book to be created.
 * @returns {Promise<Object>} - A Promise that resolves to the newly created book object.
 */
const createBook = async (book) => {
    const client = redisStore.getClient()
    const bookKey = generateBookKey(book.ISBN)
    await client.hSet(bookKey, book)
    return book
}

/**
 * Updates a book in Redis using its ISBN and the provided book update details.
 *
 * @param {string} ISBN - The ISBN of the book to be updated.
 * @param {Object} bookUpdate - The updated details of the book.
 * @param {string} [bookUpdate.title] - The updated title of the book (optional).
 * @param {string} [bookUpdate.author] - The updated author of the book (optional).
 * @param {number} [bookUpdate.publicationYear] - The updated publication year of the book (optional).
 * @returns {Promise<Object>} - A Promise that resolves to the updated book object.
 */
const updateBookByISBN = async (ISBN, bookUpdate) => {
    const client = redisStore.getClient()
    const bookKey = generateBookKey(ISBN)
    await client.hSet(bookKey, bookUpdate)
    return bookUpdate
}

/**
 * Deletes a book from Redis using its ISBN.
 *
 * @param {string} ISBN - The ISBN of the book to be deleted.
 * @returns {Promise<string>} - A Promise that resolves to the ISBN of the deleted book.
 */
const deleteBookByISBN = async (ISBN) => {
    const client = redisStore.getClient()
    const bookKey = generateBookKey(ISBN)
    await client.del(bookKey)
    return ISBN
}

/**
 * Performs a search on the books stored in Redis based on the provided search term.
 *
 * @param {string} searchTerm - The term to search for in the books' titles or authors.
 * @returns {Promise<Array>} - A Promise that resolves to an array of book objects matching the search term.
 */
const searchBooks = async (searchTerm) => {
    const books = await getBooks()

    const searchResuts = []
    for (let book of books) {
        const searchInTitle = book.title.toLowerCase().includes(searchTerm.toLowerCase())
        const searchInAuthor = book.author.toLowerCase().includes(searchTerm.toLowerCase())
        if (searchInTitle || searchInAuthor) {
            searchResuts.push(book)
        }
    }

    return searchResuts
}

module.exports = {
    getBooks,
    createBook,
    getBookByISBN,
    updateBookByISBN,
    deleteBookByISBN,
    searchBooks
}