const BookModel = require("./../../src/bookModel")
const bookFixtures = require("./../bookFixtures.json")

describe("Book Model Tests", () => {
    it("should create book from the book model", async () => {
        const book = new BookModel(bookFixtures[0])
        expect(book.title).toBe(bookFixtures[0].title)
        expect(book.author).toBe(bookFixtures[0].author)
        expect(book.ISBN).toBe(bookFixtures[0].ISBN)
        expect(book.publicationYear).toBe(bookFixtures[0].publicationYear)
    })

    it("should created book model should contain only book attributes", () => {
        const book = new BookModel({...bookFixtures[0], username: "John Doe"})
        expect(book.title).toBe(bookFixtures[0].title)
        expect(book.author).toBe(bookFixtures[0].author)
        expect(book.ISBN).toBe(bookFixtures[0].ISBN)
        expect(book.publicationYear).toBe(bookFixtures[0].publicationYear)
        expect(book.username).toBeUndefined()
    })

    it("should validate book details", async () => {
        const book = new BookModel({})
        expect(await book.validate()).toBeTruthy()
    })

    it("should check if the method that checks for similarity between books work", () => {
        const book = new BookModel(bookFixtures[0])
        expect(book.isSame(bookFixtures[0])).toBeTruthy()
        expect(book.isSame({...bookFixtures[0], title: "Another"})).toBeFalsy()
        expect(book.isSame(bookFixtures[1])).toBeFalsy()
    })

})
