const app = require("../../../src/app");
const request = require("supertest");
const redisStore = require("../../../src/redisStore");
const testHelper = require("../../testHelper");
const bookFixtures = require("../../bookFixtures.json");

let redisClient;
beforeAll(async () => {
  redisClient = redisStore.getClient();
  await redisClient.connect();
});

afterAll(async () => {
  await testHelper.cleanupDb(redisClient);
  await redisClient.disconnect();
});

describe("GET '/books' route", () => {
  test("should get all the books in the database", async () => {
    await testHelper.createBooks(bookFixtures, redisClient);
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body.status).toBeTruthy();
    expect(response.body.books.length).toBe(bookFixtures.length);
  });
});
