#!/usr/bin/env node
const { Command } = require("commander");
const Book = require("./cliFunctions");
const program = new Command();

program
  .name("book-manager")
  .description("CLI to help interact with the book API")
  .version("1.0.0");

program
  .command("all")
  .description("Get all the books")
  .action(async () => {
    const response = await Book.getBooks();
    console.log(response);
  });

program
  .command("create")
  .description("Create a book")
  .argument("<title>", "The Book Name")
  .argument("<author>", "The Book Author")
  .argument("<ISBN>", "The Book ISBN")
  .argument("<year>", "The Book Publication Year")
  .action(async (title, author, ISBN, publicationYear) => {
    const newBook = { title, author, ISBN, publicationYear };
    const response = await Book.createBook(newBook);
    console.log(response);
  });

program
  .command("get")
  .description("Get a book by its ISBN")
  .argument("<ISBN>", "The Book ISBN")
  .action(async (ISBN) => {
    const response = await Book.getBookByISBN(ISBN);
    console.log(response);
  });

program
  .command("update")
  .description("Update a book by its ISBN")
  .argument("<ISBN>", "The Book ISBN")
  .option("-t, --title <title>", "The Book Title")
  .option("-a, --author <author>", "The Book Author")
  .option("-y, --publicationYear <year>", "The Book Publication Year")
  .action(async (ISBN, options) => {
    const response = await Book.updateBookByISBN(ISBN, options);
    console.log(response);
  });

program
  .command("delete")
  .description("Delete a book by its ISBN")
  .argument("<ISBN>", "The Book ISBN")
  .action(async (ISBN) => {
    const response = await Book.deleteBookByISBN(ISBN);
    console.log(response);
  });

program
  .command("search")
  .description("Search for a book by title or author")
  .argument("<searchWord>", "Your search word")
  .action(async (searchWord) => {
    const response = await Book.searchBook(searchWord);
    console.log(response);
  });

program.parse();
