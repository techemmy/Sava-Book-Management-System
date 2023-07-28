require("dotenv").config()
const baseUrl = `http://localhost:${process.env.PORT}`

/**
 * Fetches all books from the server.
 *
 * @returns {Promise<Array>|false} - A Promise that resolves to an array of book objects, or `false` if there's an error.
 * @throws {Error} - If there's an error while fetching the books or the local server is not running.
 *
 * @example
 * const books = await getBooks();
 * console.log(books);
 */
const getBooks = async () => {
    try {
        const response = await fetch(`${baseUrl}/books`, {
            method: 'GET'
        })
        const books = await response.json()
        return books
    } catch (error) {
        console.error(`Error connecting to server at ${baseUrl}:`, error.message);
        console.log("Make sure the server is running")
        return false;
    }
}

/**
 * Creates a new book by sending book details to the server.
 *
 * @param {Object} bookDetails - The details of the book to be created.
 * @param {string} bookDetails.title - The title of the book.
 * @param {string} bookDetails.author - The author of the book.
 * @param {string} bookDetails.ISBN - The ISBN (International Standard Book Number) of the book.
 * @param {number} bookDetails.publicationYear - The publication year of the book.
 * @returns {Promise<Object>|false} - A Promise that resolves to the newly created book object, or `false` if there's an error.
 * @throws {Error} - If there's an error during the creation process or the local server is not running.
 *
 * @example
 * const newBook = {
 *   title: 'Sample Book',
 *   author: 'John Doe',
 *   ISBN: '1234567890',
 *   publicationYear: 2023
 * };
 *
 * const createdBook = await createBook(newBook);
 * console.log(createdBook);
 */
const createBook = async (bookDetails) => {
    try {
        const response = await fetch(`${baseUrl}/books`, {
            method: 'POST',
            body: JSON.stringify(bookDetails)
        })
        const book = await response.json()
        return book
    } catch (error) {
        console.error(`Error connecting to server at ${baseUrl}:`, error.message);
        console.log("Make sure the server is running")
        return false;
    }
}

/**
 * Fetches a single book from the server using its ISBN (International Standard Book Number).
 *
 * @param {string} ISBN - The ISBN of the book to be fetched.
 * @returns {Promise<Object>|false} - A Promise that resolves to the book object with the given ISBN, or `false` if there's an error.
 * @throws {Error} - If there's an error while fetching the book or the local server is not running.
 *
 * @example
 * const ISBN = '1234567890';
 * const book = await getBookByISBN(ISBN);
 * console.log(book);
 */
const getBookByISBN = async (ISBN) => {
    try {
        const response = await fetch(`${baseUrl}/books/${ISBN}`, {
            method: 'GET'
        })
        const book = await response.json()
        return book
    } catch (error) {
        console.error(`Error connecting to server at ${baseUrl}:`, error.message);
        console.log("Make sure the server is running")
        return false;
    }
}

/**
 * Updates a book on the server using its ISBN and the provided book update details.
 *
 * @param {string} ISBN - The ISBN of the book to be updated.
 * @param {Object} bookUpdate - The updated details of the book.
 * @param {string} [bookUpdate.title] - The updated title of the book (optional).
 * @param {string} [bookUpdate.author] - The updated author of the book (optional).
 * @param {number} [bookUpdate.publicationYear] - The updated publication year of the book (optional).
 * @returns {Promise<Object>|false} - A Promise that resolves to the updated book object, or `false` if there's an error.
 * @throws {Error} - If there's an error during the update process or the local server is not running.
 *
 * @example
 * const ISBN = '1234567890';
 * const bookUpdate = {
 *   title: 'Updated Book Title',
 *   author: 'Jane Doe',
 *   publicationYear: 2025
 * };
 *
 * const updatedBook = await updateBookByISBN(ISBN, bookUpdate);
 * console.log(updatedBook);
 */
const updateBookByISBN = async (ISBN, bookUpdate) => {
    try {
        const response = await fetch(`${baseUrl}/books/${ISBN}`, {
            method: 'PATCH',
            body: JSON.stringify(bookUpdate)
        })
        const book = await response.json()
        return book
    } catch (error) {
        console.error(`Error connecting to server at ${baseUrl}:`, error.message);
        console.log("Make sure the server is running")
        return false;
    }
}

/**
 * Deletes a book from the server using its ISBN (International Standard Book Number).
 *
 * @param {string} ISBN - The ISBN of the book to be deleted.
 * @returns {Promise<Object>|false} - A Promise that resolves to the deleted book object, or `false` if there's an error.
 * @throws {Error} - If there's an error during the deletion process or the local server is not running.
 *
 * @example
 * const ISBN = '1234567890';
 * const deletedBook = await deleteBookByISBN(ISBN);
 * console.log(deletedBook);
 */
const deleteBookByISBN = async (ISBN) => {
    try {
        const response = await fetch(`${baseUrl}/books/${ISBN}`, {
            method: 'DELETE'
        })
        const book = await response.json()
        return book
    } catch (error) {
        console.error(`Error connecting to server at ${baseUrl}:`, error.message);
        console.log("Make sure the server is running")
        return false;
    }
}

/**
 * Performs a search on the server for books based on the provided search term.
 *
 * @param {string} searchTerm - The term to search for in the books' titles or authors.
 * @returns {Promise<Array>|false} - A Promise that resolves to an array of book objects matching the search term, or `false` if there's an error.
 * @throws {Error} - If there's an error during the search process or the local server is not running.
 *
 * @example
 * const searchTerm = 'JavaScript';
 * const searchResults = await searchBook(searchTerm);
 * console.log(searchResults);
 */
const searchBook = async (searchTerm) => {
    try {
        const response = await fetch(`${baseUrl}/books/search?term=${searchTerm}`, {
            method: 'GET'
        })
        const book = await response.json()
        return book
    } catch (error) {
        console.error(`Error connecting to server at ${baseUrl}:`, error.message);
        console.log("Make sure the server is running")
        return false;
    }
}

module.exports = {
    getBooks,
    createBook,
    getBookByISBN,
    updateBookByISBN,
    deleteBookByISBN,
    searchBook
}
