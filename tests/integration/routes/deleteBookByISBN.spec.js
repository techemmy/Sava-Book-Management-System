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

describe("DELETE '/books' route", () => {
  test("should delete a book", async () => {
    await testHelper.createBook(bookFixtures[0], redisClient);
    const response = await request(app).delete(
      `/books/${bookFixtures[0].ISBN}`,
    );
    expect(response.status).toBe(200);
    expect(response.body.status).toBeTruthy();
  });

  test("should return 404 error if book doesn't exist", async () => {
    const response = await request(app).delete(
      `/books/${bookFixtures[0].ISBN}`,
    );
    expect(response.status).toBe(404);
    expect(response.body.status).toBeFalsy();
  });
});
