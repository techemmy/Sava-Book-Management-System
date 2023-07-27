const app = require("../../../src/app")
const request = require("supertest")
const redisStore = require("../../../src/redisStore");
const testHelper = require("../../testHelper")
const bookFixtures = require("../../bookFixtures.json")

let redisClient;
beforeAll(async () => {
    redisClient = redisStore.getClient();
    await redisClient.connect()
})

afterAll(async () => {
    await testHelper.cleanupDb(redisClient)
    await redisClient.disconnect();
})

describe("PATCH '/books/:id' route", () => {
    beforeEach(async () => {
        await testHelper.createBooks(bookFixtures, redisClient)
    })
    afterEach(async () => {
        await testHelper.cleanupDb(redisClient)
    })

    test("should update a book in the database", async () => {
        const bookUpdate = bookFixtures[1]
        const response = await request(app)
            .patch(`/books/${bookFixtures[0].ISBN}`).send(bookUpdate)
        expect(response.status).toBe(200)
        expect(response.body.status).toBeTruthy()
        expect(response.body.updatedBook.ISBN).toBe(bookFixtures[0].ISBN)
        expect(response.body.updatedBook.title).toBe(bookUpdate.title)
        expect(response.body.updatedBook.author).toBe(bookUpdate.author)
        expect(parseInt(response.body.updatedBook.publicationYear)).toBe(bookUpdate.publicationYear)
    })

    test("should return an 404 if the book to be updated doesn't exist", async () => {
        const bookUpdate = bookFixtures[1]
        const response = await request(app)
            .patch(`/books/v-11ery-iinvalid-23-one`).send(bookUpdate)
        expect(response.status).toBe(404)
        expect(response.body.status).toBeFalsy()
    })

    test("should not update book if there's a validation error", async () => {
        const bookUpdate = { ...bookFixtures[1], title: "" }
        const response = await request(app)
            .patch(`/books/${bookFixtures[0].ISBN}`).send(bookUpdate)
        expect(response.status).toBe(422)
        expect(response.body.status).toBeFalsy()
    })

    test("should not write to the database update is the same as current book", async () => {
        const response = await request(app)
            .patch(`/books/${bookFixtures[0].ISBN}`).send(bookFixtures[0])
        expect(response.status).toBe(204)
    })


})

