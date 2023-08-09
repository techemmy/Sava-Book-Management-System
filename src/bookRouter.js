const {
  getBooks,
  getBookByISBN,
  createBook,
  updateBookByISBN,
  deleteBookByISBN,
  searchBooks,
} = require("./bookController");
const { sendResponse, urlContainsISBN } = require("./utils");

const baseUrl = "/books";

// Request handler function for processing incoming requests.
module.exports = (req, res) => {
  // Handle the root URL, returning a simple homepage response.
  if (req.url === "/") {
    sendResponse(res, 200, { status: true, message: "Homepage" });
  } else if (req.url === baseUrl && req.method === "GET") {
    // Handle GET request to '/books', calls the 'getBooks' function to retrieve all books.
    getBooks(req, res);
  } else if (req.url === baseUrl && req.method === "POST") {
    // Handle POST request to '/books', calls the 'createBook' function to create a new book.
    createBook(req, res);
  } else if (req.url.startsWith(`${baseUrl}/search`) && req.method === "GET") {
    // Handle GET request to '/books/search', calls the 'searchBooks' function to search for books by term.
    searchBooks(req, res);
  } else if (urlContainsISBN(req.url) && req.method === "GET") {
    // Handle GET request to '/books/:ISBN', calls the 'getBookByISBN' function to get a book by its ISBN number.
    getBookByISBN(req, res);
  } else if (urlContainsISBN(req.url) && req.method === "PATCH") {
    // Handle PATCH request to '/books/:ISBN', calls the 'updateBookByISBN' function to update a book by its ISBN number.
    updateBookByISBN(req, res);
  } else if (urlContainsISBN(req.url) && req.method === "DELETE") {
    // Handle DELETE request to '/books/:ISBN', calls the 'deleteBookByISBN' function to delete a book by its ISBN number.
    deleteBookByISBN(req, res);
  } else {
    // Handle any other unhandled paths with a 404 response.
    sendResponse(res, 404, { status: false, message: "Path not found" });
  }
};
