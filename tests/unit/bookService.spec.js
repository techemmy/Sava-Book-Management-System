const redisStore = require("../../src/redisStore");
const bookService = require("../../src/bookService");
const bookFixtures = require("../bookFixtures.json");
const testHelper = require("../testHelper");

let redisClient;
beforeAll(async () => {
  redisClient = redisStore.getClient();
  await redisClient.connect();
});

afterAll(async () => {
  await testHelper.cleanupDb(redisClient);
  await redisClient.disconnect();
});

describe("Book Service Tests", () => {
  afterEach(async () => {
    await testHelper.cleanupDb(redisClient);
  });

  it("should get books from the database", async () => {
    await testHelper.createBooks(bookFixtures, redisClient);
    const books = await bookService.getBooks();
    expect(books.length).toBe(bookFixtures.length);
  });

  it("should get a book by ISBN from the database", async () => {
    await testHelper.createBook(bookFixtures[0], redisClient);
    const book = await bookService.getBookByISBN(
      bookFixtures[0].ISBN,
      redisClient,
    );
    expect(book.ISBN).toBe(bookFixtures[0].ISBN);
    expect(book.author).toBe(bookFixtures[0].author);
    expect(book.title).toBe(bookFixtures[0].title);
    expect(parseInt(book.publicationYear)).toBe(
      bookFixtures[0].publicationYear,
    );
  });

  it("should create a book and store in database", async () => {
    await bookService.createBook(bookFixtures[0]);
    const book = await testHelper.getBooks(redisClient);
    expect(book.length).toBe(1);
    expect(book[0].ISBN).toBe(bookFixtures[0].ISBN);
  });

  it("should update a book an existing book successfully", async () => {
    await testHelper.createBook(bookFixtures[0], redisClient);
    const bookUpdate = bookFixtures[1];
    delete bookUpdate.ISBN;
    bookService.updateBookByISBN(bookFixtures[0].ISBN, bookUpdate);
    const book = await testHelper.getBookByISBN(
      bookFixtures[0].ISBN,
      redisClient,
    );
    expect(book.ISBN).toBe(bookFixtures[0].ISBN);
    expect(book.title).toBe(bookUpdate.title);
    expect(book.author).toBe(bookUpdate.author);
    expect(parseInt(book.publicationYear)).toBe(bookUpdate.publicationYear);
  });

  it("should delete an existing book successfully", async () => {
    await testHelper.createBook(bookFixtures[0], redisClient);
    const bookBeforeDelete = await testHelper.getBookByISBN(
      bookFixtures[0].ISBN,
      redisClient,
    );
    await bookService.deleteBookByISBN(bookBeforeDelete.ISBN);
    const bookAfterDelete = await testHelper.getBookByISBN(
      bookFixtures[0],
      redisClient,
    );
    expect(bookBeforeDelete.ISBN).toBe(bookFixtures[0].ISBN);
    expect(bookBeforeDelete.title).toBe(bookFixtures[0].title);
    expect(bookBeforeDelete.author).toBe(bookFixtures[0].author);
    expect(parseInt(bookBeforeDelete.publicationYear)).toBe(
      bookFixtures[0].publicationYear,
    );
    expect(bookAfterDelete.ISBN).toBeUndefined();
    expect(bookAfterDelete.author).toBeUndefined();
    expect(bookAfterDelete.title).toBeUndefined();
    expect(bookAfterDelete.publicationYear).toBeUndefined();
  });
});
