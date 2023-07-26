const config = require("./config")

const sendResponse = (responseObject, statusCode, responseBody) => {
    /**
     * Generates a json response based on the status code and responseBody
     * and returns the response to the client
     * @param {object} responseObject - the server response object
     * @param {number} statusCode - the status code for the response
     * @param {object} responseBody - the data to be sent to the user
     */

    responseObject.writeHead(statusCode, { "Content-Type": "application/json" });
    responseObject.end(JSON.stringify(responseBody))
}

const generateBookKey = (bookISBN) => {
    /**
     * Generates a key for storing books in the memory
     * @param {string} bookISBN - the ISBN of for a book
     * @returns {string} - the key for storing the book in memory
     */
    const prefix = config.redis.KEY_PREFIX
    return `${prefix}:${bookISBN}`
}

const getISBNFromUrl = (url) => {
    /**
     * Retrieves the ISBN number from the request url
     * @param {string} url - the request url
     * @returns {string} - the ISBN number
     */
    return url.split('/').pop()
}

const getRequestBody = (req) => {
    /**
     * Gets the data passed in the body of a request
     * @param {object} req - Node Request object
     * @returns {Promise} a promise that resolves to return the request body data
     */
    return new Promise((resolve, reject) => {
        let requestBody = '';
        req.on('data', chunk => {
            requestBody += chunk
        })

        req.on('end', () => {
            // the request body will only be an empty object '{}' if the request body
            // is an empty string to prevent error parsing an empty string
            const requestData = JSON.parse(requestBody || '{}');
            return resolve(requestData)
        })
    })
}

module.exports = {
    sendResponse,
    generateBookKey,
    getISBNFromUrl,
    getRequestBody
}