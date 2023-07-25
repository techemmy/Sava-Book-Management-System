const { getBooks, getBookByISBN, createBook, updateBookByISBN, deleteBookByISBN } = require("./bookController");
const { sendResponse } = require("./utils");

module.exports = (req, res) => {
    const baseUrl = "/books"

    // regex to test for paths with an ISBN number
    const bookPathWithISBNRegex = /books\/([A-Za-z0-9]?(-[A-Za-z0-9]?)?)/i

    // handle the urls based on the endpoint
    if (req.url === baseUrl && req.method === "GET") {
        // GET '/books' -> to get bboks
        getBooks(req, res)
    } else if (req.url === baseUrl && req.method === "POST") {
        // POST '/books' -> to create bboks
        createBook(req, res)
    } else if (bookPathWithISBNRegex.test(req.url) && req.method === "GET") {
        // GET '/books/:ISBN' -> to get book by the ISBN number
        getBookByISBN(req, res)
    } else if (bookPathWithISBNRegex.test(req.url) && req.method === "PATCH") {
        // PATCH '/books/:ISBN' -> to update a book by the ISBN number
        updateBookByISBN(req, res)
    } else if (bookPathWithISBNRegex.test(req.url) && req.method === "DELETE") {
        // DELETE '/books/:ISBN' -> to delete a book by the ISBN number
        deleteBookByISBN(req, res)
    } else {
        sendResponse(res, 404, {status: false, message: 'Path not found'})
    }
}