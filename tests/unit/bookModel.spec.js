const app = require("../../src/app")
const bookModel = require("./../../src/bookModel")
const books = require("./../fixtures.json")

describe("Book Model Tests", () => {
    it("should create book from the book model", async () => {
        const book = new bookModel(books[0])
        expect(book.title).toBe(books[0].title)
        expect(book.author).toBe(books[0].author)
        expect(book.ISBN).toBe(books[0].ISBN)
        expect(book.publicationYear).toBe(books[0].publicationYear)
    })

    it("should created book model should contain only book attributes", () => {
        const book = new bookModel({...books[0], username: "John Doe"})
        expect(book.title).toBe(books[0].title)
        expect(book.author).toBe(books[0].author)
        expect(book.ISBN).toBe(books[0].ISBN)
        expect(book.publicationYear).toBe(books[0].publicationYear)
        expect(book.username).toBeUndefined()
    })

    it("should validate book details", async () => {
        const book = new bookModel({})
        expect(await book.validate()).toBeTruthy()
    })

    it("should check if the method that checks for similarity in books work", () => {
        const book = new bookModel(books[0])
        expect(book.isSame(books[0])).toBeTruthy()
        expect(book.isSame({...books[0], title: "Another"})).toBeFalsy()
        expect(book.isSame(books[1])).toBeFalsy()
    })

})
