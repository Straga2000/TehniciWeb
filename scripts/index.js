// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/book", (req, res) => {
    const booksList = readJSONFile();
    const newbook = req.body;
    newbook.id = booksList.length;
    const newbookList = [...booksList, newbook];
    writeJSONFile(newbookList);
    res.json(newbook);
  });

// Read One
app.get("/book/:id", (req, res) => {
    const booksList = readJSONFile();
    const id = req.params.id;
    let idFound = false;
    let foundbook;
  
    booksList.forEach(book => {
      if (id == book.id) {
        idFound = true;
        foundbook = book
      }
    });
  
    if (idFound) {
      res.json(foundbook);
    } else {
      res.status(404).send(`book ${id} was not found`);
    }
  });

// Read All
app.get("/book", (req, res) => {
    const booksList = readJSONFile();
    res.json(booksList);
    // Completati cu codul vostru aici
});

// Update
app.put("/dogs/:id", (req, res) => {
    const dogsList = readJSONFile();
    // Completati cu codul vostru aici
});

// Delete
app.delete("/book/:id", (req, res) => {
    const booksList = readJSONFile();
    const id = req.params.id;
    const newBooksList = booksList.filter((book) => book.id != id)
  
    if (booksList.length !== newBooksList.length) {
      res.status(200).send(`Book ${id} was removed`);
      writeJSONFile(newBooksList);
    } else {
      res.status(404).send(`Book ${id} was not found`);
    }
  });

// Functia de citire din fisierul db.json
function readJSONFile() {
    return JSON.parse(fs.readFileSync("../database/books.json"))["book"];
}

// Functia de scriere in fisierul db.json
function writeJSONFile(content) {
    fs.writeFileSync(
        "../database/books.json",
        JSON.stringify({ book: content }),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}

app.put("/book/:id", (req, res) => {
    let booksList = readJSONFile();
    let id = req.params.id;
    let newbook = req.body;
    newbook.id = id;
    idFound = false;
  
    const newbooksList = booksList.map((book) => {
       if (book.id == id) {
         idFound = true;
         return newbook
       }
      return book
    })
    
    writeJSONFile(newbooksList);
  
    if (idFound) {
      res.json(newbook);
    } else {
      res.status(404).send(`book ${id} was not found`);
    }
  
  });


app.use(express.static('../'));

// Pornim server-ul
app.listen("3000", () =>
    console.log("Server started at: http://localhost:3000")
);