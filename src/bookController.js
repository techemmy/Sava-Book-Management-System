const { sendResponse, getISBNFromUrl, getRequestBody } = require("./utils")
const bookService = require("./bookService")
const Book = require("./bookModel")

const getBooks = async (req, res) => {
    try {
        const books = await bookService.getBooks()
        sendResponse(res, 200, { "status": true, message: "get books", books })
    } catch (error) {
        console.log(error)
        sendResponse(res, 400, { "status": false, message: error.message })
    }
}

const createBook = async (req, res) => {
    try {
        const requestData = await getRequestBody(req)
        const existingBook = await bookService.getBookByISBN(requestData.ISBN);

        if (Object.keys(existingBook).length > 0) {
            return sendResponse(res, 409, { "status": false, message: "Book already exists!" })
        }

        const newBook = new Book(requestData)

        const validationError = await newBook.validate()
        if (validationError) {
            return sendResponse(res, 422, { "status": false, message: validationError })
        }

        await bookService.createBook(newBook)
        sendResponse(res, 200, { "status": true, message: "Book created!", newBook })
    } catch (error) {
        console.log(error)
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
        console.log(error)
        sendResponse(res, 400, { "status": false, message: error.message })
    }
}

// TODO: updateBookByISBN and deleteBookByISBN routes/functionalities

const updateBookByISBN = (req, res) => {
    try {
        sendResponse(res, 200, { "status": true, message: "update book by isbn" })
    } catch (error) {
        console.log(error)
        sendResponse(res, 400, { "status": false, message: error.message })
    }
}

const deleteBookByISBN = (req, res) => {
    try {
        sendResponse(res, 200, { "status": true, message: "delete book by isbn" })
    } catch (error) {
        console.log(error)
        sendResponse(res, 400, { "status": false, message: error.message })
    }
}

module.exports = {
    getBooks,
    getBookByISBN,
    createBook,
    updateBookByISBN,
    deleteBookByISBN
}