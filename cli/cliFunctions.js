require("dotenv").config()
const baseUrl = `http://localhost:${process.env.PORT}`

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
