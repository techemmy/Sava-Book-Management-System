const { sendResponse, getISBNFromUrl, getRequestBody } = require("./utils")
const bookService = require("./bookService")
const Book = require("./bookModel")
const logger = require("./logger")

const getBooks = async (req, res) => {
    try {
        const books = await bookService.getBooks()
        sendResponse(res, 200, { "status": true, message: "get books", books })
    } catch (error) {
        logger.error(error)
        sendResponse(res, 400, { "status": false, message: error.message })
    }
}

const createBook = async (req, res) => {
    try {
        // Extract the request body.
        const requestData = await getRequestBody(req)

        const newBook = new Book(requestData)

        // Validate the user input.
        const validationError = await newBook.validate()
        if (validationError) {
            return sendResponse(res, 422, { "status": false, message: validationError })
        }

        // Check if the book already exists by ISBN.
        const existingBook = await bookService.getBookByISBN(newBook.ISBN);
        if (Object.keys(existingBook).length > 0) {
            return sendResponse(res, 409, { "status": false, message: "Book already exists!" })
        }

        await bookService.createBook(newBook)
        sendResponse(res, 201, { "status": true, message: "Book created!", newBook })
    } catch (error) {
        logger.error(error)
        sendResponse(res, 400, { "status": false, message: error.message })
    }
}

const getBookByISBN = async (req, res) => {
    try {
        const ISBN = getISBNFromUrl(req.url)
        const book = await bookService.getBookByISBN(ISBN)

        // If the book is not found
        if (Object.keys(book).length === 0) {
            return sendResponse(res, 404, { "status": false, message: "Book not found" })
        }

        sendResponse(res, 200, { "status": true, message: "Book Details", book })
    } catch (error) {
        logger.error(error)
        sendResponse(res, 400, { "status": false, message: error.message })
    }
}

const updateBookByISBN = async (req, res) => {
    try {
        const ISBN = getISBNFromUrl(req.url)
        const oldBook = await bookService.getBookByISBN(ISBN)
        const update = await getRequestBody(req)

        // Check if the book exists based on the ISBN.
        if (Object.keys(oldBook).length === 0) {
            return sendResponse(res, 404, { "status": false, message: "Book not found" })
        }

        // Create a new Book instance with the updated book data.
        // Note: Ensure that the ISBN cannot be manipulated by using the existing ISBN.
        const bookUpdate = new Book({ ...oldBook, ...update, ISBN })

        // Validate the updated book data.
        const validationError = await bookUpdate.validate()
        if (validationError) {
            return sendResponse(res, 422, { "status": false, message: validationError })
        }

        // Prevent writing to the database if there is no difference in the update and the current book.
        // Note: This is done to reduce operations on the database
        if (bookUpdate.isSame(oldBook)) {
            return sendResponse(res, 204, { "status": true, message: "No changes made!" })
        }

        const updatedBook = await bookService.updateBookByISBN(ISBN, bookUpdate)
        sendResponse(res, 200, { "status": true, message: "Book updated!", updatedBook })
    } catch (error) {
        logger.error(error)
        sendResponse(res, 400, { "status": false, message: error.message })
    }
}

const deleteBookByISBN = async (req, res) => {
    try {
        const ISBN = getISBNFromUrl(req.url)
        const book = await bookService.getBookByISBN(ISBN)

        // If the book is not found, respond with a 404 status code and an error message.
        if (Object.keys(book).length === 0) {
            return sendResponse(res, 404, { "status": false, message: "Book not found" })
        }

        await bookService.deleteBookByISBN(ISBN)
        sendResponse(res, 200, { "status": true, message: "Book deleted!" })
    } catch (error) {
        logger.error(error)
        sendResponse(res, 400, { "status": false, message: error.message })
    }
}

const searchBooks = async (req, res) => {
    try {
        // Replace URL-encoded characters in the URL string to get the search term.
        const url = req.url.replaceAll("%27", "").replaceAll("%22", "")
        const searchTermLocation = url.indexOf("=")

        // If no search term is detected in the URL, respond with a 400 status code and an error message.
        if (searchTermLocation === -1) {
            return sendResponse(res, 400, { "status": false, message: "No search term detected was detected in the URL" })
        }

        // Extract the search term from the URL.
        const searchTerm = url.substring(searchTermLocation + 1, url.length)

        const books = await bookService.searchBooks(searchTerm)
        sendResponse(res, 200, { "status": true, message: "Search Results", books })
    } catch (error) {
        logger.error(error)
        sendResponse(res, 400, { "status": false, message: error.message })
    }

}

module.exports = {
    getBooks,
    getBookByISBN,
    createBook,
    updateBookByISBN,
    deleteBookByISBN,
    searchBooks
}