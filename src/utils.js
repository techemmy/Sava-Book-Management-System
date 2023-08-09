const config = require("./config");

/**
 * Generates a JSON response based on the status code and responseBody
 * and sends the response to the client.
 *
 * @param {object} responseObject - The server response object.
 * @param {number} statusCode - The status code for the response.
 * @param {object} responseBody - The data to be sent to the user as the response body.
 */
const sendResponse = (responseObject, statusCode, responseBody) => {
  responseObject.writeHead(statusCode, { "Content-Type": "application/json" });
  responseObject.end(JSON.stringify(responseBody));
};

/**
 * Generates a key for storing books in the memory based on the environment.
 *
 * @param {string} bookISBN - The ISBN of a book.
 * @returns {string} - The key for storing the book in memory.
 */
const generateBookKey = (bookISBN) => {
  const prefix = config.redis.KEY_PREFIX;
  const testPrefix = config.redis.TEST_KEY_PREFIX;
  const isTestingMode = config.server.NODE_ENV === "testing";
  return isTestingMode ? `${testPrefix}:${bookISBN}` : `${prefix}:${bookISBN}`;
};

/**
 * Retrieves the ISBN number from the request URL.
 *
 * @param {string} url - The request URL.
 * @returns {string} - The ISBN number.
 */
const getISBNFromUrl = (url) => {
  return url.split("/").pop();
};

/**
 * Checks if a given URL contains an ISBN number in the path.
 *
 * @param {string} url - The URL to be tested.
 * @returns {boolean} - `true` if the URL contains an ISBN number in the path, otherwise `false`.
 */
const urlContainsISBN = (url) => {
  // Regular expression to test for paths with an ISBN number in the URL.
  const bookPathWithISBNRegex = /books\/([A-Za-z0-9]?(-[A-Za-z0-9]?)?)/i;
  return bookPathWithISBNRegex.test(url)
}

/**
 * Checks if a given URL contains pagination parameters for the "books" endpoint.
 *
 * @param {string} url - The URL to be tested.
 * @returns {boolean} - `true` if the URL contains pagination parameters, otherwise `false`.
 */
const urlContainsPaginationParams = (url) => {
  const urlRegex = /^\/books\?page=\d+$/
  return urlRegex.test(url)
}


/**
 * Gets the data passed in the body of a request.
 *
 * @param {object} req - Node Request object.
 * @returns {Promise} - A promise that resolves to the request body data.
 */
const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let requestBody = "";
    req.on("data", (chunk) => {
      requestBody += chunk;
    });

    req.on("end", () => {
      try {
        const requestData = JSON.parse(requestBody);
        return resolve(requestData);
      } catch (error) {
        reject(
          new Error(
            "Invalid input. Make sure you data is properly formatted too.",
          ),
        );
      }
    });
  });
};

module.exports = {
  sendResponse,
  generateBookKey,
  getISBNFromUrl,
  getRequestBody,
  urlContainsISBN,
  urlContainsPaginationParams
};
