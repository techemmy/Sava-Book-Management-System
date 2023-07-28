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

describe("POST '/books' route", () => {
  afterEach(async () => {
    await testHelper.cleanupDb(redisClient);
  });

  test("should create a book", async () => {
    const response = await request(app).post("/books").send(bookFixtures[0]);
    expect(response.status).toBe(201);
    expect(response.body.status).toBeTruthy();
    expect(response.body.newBook).toEqual(bookFixtures[0]);
  });

  test("should fail to create a book due to invalid title", async () => {
    const response = await request(app)
      .post("/books")
      .send({ ...bookFixtures[0], title: "" });
    expect(response.status).toBe(422);
    expect(response.body.status).toBeFalsy();
  });

  test("should fail to create a book due to short title", async () => {
    const response = await request(app)
      .post("/books")
      .send({ ...bookFixtures[0], title: "Cr" });
    expect(response.status).toBe(422);
    expect(response.body.status).toBeFalsy();
  });

  test("should fail to create a book due to invalid author", async () => {
    const response = await request(app)
      .post("/books")
      .send({ ...bookFixtures[0], author: "" });
    expect(response.status).toBe(422);
    expect(response.body.status).toBeFalsy();
  });

  test("should fail to create a book due to short author name", async () => {
    const response = await request(app)
      .post("/books")
      .send({ ...bookFixtures[0], author: "a" });
    expect(response.status).toBe(422);
    expect(response.body.status).toBeFalsy();
  });

  test("should fail to create a book due to publication year before 1900", async () => {
    const response = await request(app)
      .post("/books")
      .send({
        ...bookFixtures[0],
        publicationYear: 1800,
      });
    expect(response.status).toBe(422);
    expect(response.body.status).toBeFalsy();
  });

  test("should fail to create a book due to non-integer publication year", async () => {
    const response = await request(app)
      .post("/books")
      .send({
        ...bookFixtures[0],
        publicationYear: "shh",
      });
    expect(response.status).toBe(422);
    expect(response.body.status).toBeFalsy();
  });
  test("should fail to create a book due to invalid publication year", async () => {
    const response = await request(app)
      .post("/books")
      .send({
        ...bookFixtures[0],
        publicationYear: "",
      });
    expect(response.status).toBe(422);
    expect(response.body.status).toBeFalsy();
  });

  test("should fail to create a book due to short ISBN", async () => {
    const response = await request(app)
      .post("/books")
      .send({
        ...bookFixtures[0],
        ISBN: "too short",
      });
    expect(response.status).toBe(422);
    expect(response.body.status).toBeFalsy();
  });

  test("should fail to create a book due to invalid ISBN", async () => {
    const response = await request(app)
      .post("/books")
      .send({
        ...bookFixtures[0],
        ISBN: "",
      });
    expect(response.status).toBe(422);
    expect(response.body.status).toBeFalsy();
  });

  test("should fail to create a book that already exists", async () => {
    await testHelper.createBook(bookFixtures[0], redisClient);
    const response = await request(app).post("/books").send(bookFixtures[0]);
    expect(response.status).toBe(409);
    expect(response.body.status).toBeFalsy();
  });
});
