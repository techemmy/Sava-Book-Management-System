const Joi = require("joi")

// The schema validation is based on my research on what the attributes could possibly be
// with slight modifications of my own
const bookSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required(),
    author: Joi.string()
        .min(2)
        .max(30)
        .required(),
    publicationYear: Joi.number()
        .integer()
        .positive()
        .min(1900)
        .max(new Date().getFullYear())
        .required(),
    ISBN: Joi.string()
        .min(10)
        .required()
})

module.exports = class Book {
    constructor({ title, author, publicationYear, ISBN }) {
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.ISBN = ISBN
    }

    /**
     * Validates the book object against the defined schema.
     *
     * @returns {string|boolean} - If there is a validation error, returns the error message. Otherwise, returns false.
     */
    async validate() {
        const validation = await bookSchema.validate(this);
        const error = validation.error?.details[0]
        return error ? error.message : false
    }

    /**
     * Checks if the current book's properties match the provided book properties.
     *
     * @param {Object} bookData - The book properties (title, author, and publicationYear) to compare with the current book.
     * @returns {boolean} - Returns true if the book properties match, otherwise returns false.
     */
    isSame({ title, author, publicationYear }) {
        return (this.title === title) && (this.author === author) && (this.publicationYear === parseInt(publicationYear))
    }
}
