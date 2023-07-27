const Joi = require("joi")

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

    async validate() {
        const validation = await bookSchema.validate(this);
        const error = validation.error?.details[0]
        return error ? error.message : false
    }

    isSame({ title, author, publicationYear }) {
        return (this.title === title) && (this.author === author) && (this.publicationYear === parseInt(publicationYear))
    }
}
