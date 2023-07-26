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
        const requestData = await getRequestBody(req)

        const newBook = new Book(requestData)

        // validate the user input
        const validationError = await newBook.validate()
        if (validationError) {
            return sendResponse(res, 422, { "status": false, message: validationError })
        }

        // check if the books exists already
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

        // check if books exists
        if (Object.keys(oldBook).length === 0) {
            return sendResponse(res, 404, { "status": false, message: "Book not found" })
        }

        // update the book and make sure the ISBN cannot be manipulated
        const bookUpdate = new Book({ ...oldBook, ...update, ISBN })

        // validate the updated book
        const validationError = await bookUpdate.validate()
        if (validationError) {
            return sendResponse(res, 422, { "status": false, message: validationError })
        }

        // prevent write to database if there is no difference in the update and the current book
        if (bookUpdate.isSame(oldBook)) {
            return sendResponse(res, 204, { "status": true, message: "No changes made!" })
        }

        await bookService.updateBookByISBN(ISBN, bookUpdate)
        sendResponse(res, 200, { "status": true, message: "Book updated!" })
    } catch (error) {
        logger.error(error)
        sendResponse(res, 400, { "status": false, message: error.message })
    }
}

const deleteBookByISBN = async (req, res) => {
    try {
        const ISBN = getISBNFromUrl(req.url)
        const book = await bookService.getBookByISBN(ISBN)

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
        const url = req.url.replaceAll("%27", "").replaceAll("%22", "")
        const searchTermLocation = url.indexOf("=")
        if (searchTermLocation === -1) {
            return sendResponse(res, 400, { "status": false, message: "No search term detected was detected in the URL" })
        }

        const searchTerm = url.substring(searchTermLocation + 1, url.length)
        const books = await bookService.searchBooks(searchTerm)
        sendResponse(res, 200, { "status": false, message: "Search Results", books})
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