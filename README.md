<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#cli-app">CLI App</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The Book Management System is a server-side application built with Node.js that allows users to manage a collection of books. It utilizes a Redis in-memory database to store book data and provides various API endpoints to perform CRUD (Create, Read, Update, Delete) operations on the books. Additionally, the project includes a Command Line Interface (CLI) app that allows users to interact with the API directly from the command line.

### API Features

- Get a list of all books in the collection.
- Get a book by its ISBN number.
- Create a new book and add it to the collection.
- Update an existing book by its ISBN number.
- Delete a book by its ISBN number.
- Search for books by title or author.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) NodeJs - [Cross-platform JavaScript runtime environment](https://nodejs.org/)
* ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) Redis - [in-memory data store](https://redis.io/)
* ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) Jest - [Javascript testing framework](https://jestjs.io/)
* Supertest - [Library for testing HTTP servers](https://www.npmjs.com/package/supertest)
* Commander - [Library for building CLI(command line interfaces)](npmjs.com/package/commander)
* ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) Nodemon - [For monitoring changes and automatically reloading my server](https://nodemon.io/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
### Prerequisites

- Node.js (version 18 or above)
- Redis Server (running on the default port 6379)

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/techemmy/Book-Management-System
   ```
2. Install Dependencies
   ```sh
   cd Book-Management-System
   npm install
   ```
3. Set up environment variables and fill in it as appropriate
   ```sh
   cp .example.env .env
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. Start your redis server depending on how you installed it
   ```sh
   redis-server
   ```
2. Start the server
   ```sh
   npm run start
   ```

3. Access the API:
The API will be available at http://localhost:3000 (change the port if you specified a different one in the .env file).

4. Use the CLI app
The project includes a CLI app that allows users to interact with the API from the command line. To use the CLI, navigate to the root directory of the project and run for info on how to use it:
   ```sh
   book-manager -h
   ```


_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## API Endpoints
- `GET /books` : Get a list of all books.
- `GET /books/:ISBN` : Get a book by its ISBN number.
- `POST /books` : Create a new book.
- `PATCH /books/:ISBN` : Update an existing book by its ISBN number.
- `DELETE /books/:ISBN` : Delete a book by its ISBN number.
- `GET /books/search?term=keyword` : Search for books by title or author using the provided search term.
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Emmanuel Oloyede - [@Itechemmy](https://twitter.com/Itechemmy)

Project Link: [https://github.com/techemmy/Book-Management-System](https://github.com/techemmy/Book-Management-System)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<p align="right">(<a href="#readme-top">back to top</a>)</p>
