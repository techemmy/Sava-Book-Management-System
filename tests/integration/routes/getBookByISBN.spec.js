const app = require("../../../src/app");
const request = require("supertest");
const redisStore = require("../../../src/redisStore");
const testHelper = require("../../testHelper");
const bookFixtures = require("../../bookFixtures.json");

let redisClient;
beforeAll(async () => {
  redisClient = redisStore.getClient();
  await redisClient.connect();
  await testHelper.createBooks(bookFixtures, redisClient);
});

afterAll(async () => {
  await testHelper.cleanupDb(redisClient);
  await redisClient.disconnect();
});

describe("GET '/books/:ISBN' route", () => {
  test("should get a book by the ISBN", async () => {
    const bookToTest = bookFixtures[0];
    const response = await request(app).get(`/books/${bookToTest.ISBN}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBeTruthy();
    expect(response.body.book.title).toEqual(bookToTest.title);
    expect(response.body.book.author).toEqual(bookToTest.author);
    expect(response.body.book.ISBN).toEqual(bookToTest.ISBN);
    expect(parseInt(response.body.book.publicationYear)).toEqual(
      bookToTest.publicationYear,
    );
  });

  test("should return a 404 for an ISBN that doesn't exist", async () => {
    const response = await request(app).get(`/books/232-i-don't-know-282389`);
    expect(response.status).toBe(404);
    expect(response.body.status).toBeFalsy();
  });
});
