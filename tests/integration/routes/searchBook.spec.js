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

describe("GET '/books/search' route", () => {
    test("should get search for books with 'l' in the database", async () => {
        await testHelper.createBooks(bookFixtures, redisClient)
        const searchResults = testHelper.searchTermInBooks('l', bookFixtures)
        const response = await request(app).get("/books/search?term=l")
        expect(response.status).toBe(200)
        expect(response.body.status).toBeTruthy()
        expect(response.body.books.length).toEqual(searchResults.length)
    })

    test("should return all the books in the database if an empty string is passed", async () => {
        await testHelper.createBooks(bookFixtures, redisClient)
        const response = await request(app).get("/books/search?term=")
        expect(response.status).toBe(200)
        expect(response.body.status).toBeTruthy()
        expect(response.body.books.length).toEqual(bookFixtures.length)
    })

    test("should fail to search database is no search term is found", async () => {
        const response = await request(app).get("/books/search?")
        expect(response.status).toBe(400)
        expect(response.body.status).toBeFalsy()
    })
})

