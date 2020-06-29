var pathBooks = "../Database/books.json";
var pathPosts = "../Database/posts.json";

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// CREATE A NEW BOOK
app.post("/book", (req, res) => {
    const booksList = readJSONFile("book");
    const newbook = req.body;
    newbook.id = booksList.length;
    const newbookList = [...booksList, newbook];
    writeJSONFile(newbookList, "book");
    res.json(newbook);
  });

// READ ONE BOOK
app.get("/book/:id", (req, res) => {
    const booksList = readJSONFile("book");
    const id = req.params.id;
    let idFound = false;
    let foundbook = null;
  
    booksList.forEach(book => {
      if (id == book.id) {
        idFound = true;
        foundbook = book;
      }
    });
  
    if (idFound) {
      res.json(foundbook);
    } else {
      res.status(404).send(`book ${id} was not found`);
    }
  });

// GET ALL BOOKS
app.get("/book", (req, res) => {
    const booksList = readJSONFile("book");
    res.json(booksList);
});

//DELETE ONE BOOK
app.delete("/book/:id", (req, res) => {
    const booksList = readJSONFile("book");
    const id = req.params.id;
    const newBooksList = booksList.filter((book) => book.id != id)
  
    if (booksList.length !== newBooksList.length) {
      res.status(200).send(`Book ${id} was removed`);
      writeJSONFile(newBooksList, "book");
    } else {
      res.status(404).send(`Book ${id} was not found`);
    }
  });

// UPDATE ONE BOOK
app.put("/book/:id", (req, res) => {
    let booksList = readJSONFile("book");
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
    });

    writeJSONFile(newbooksList, "book");

    if (idFound) {
        res.json(newbook);
    } else {
        res.status(404).send(`book ${id} was not found`);
    }

});

//GET ALL POSTS
app.get("/posts", (req, res) => {
    const postList = readJSONFile("posts");
    res.json(postList);
});

//DELETE ONE POST
app.delete("/posts/:id", (req, res) => {
    const postList = readJSONFile("posts");
    const id = req.params.id;
    const newPostList = postList.filter((post) => post.id != id);

    if (postList.length !== newPostList.length) {
        res.status(200).send(`Post ${id} was removed`);
        writeJSONFile(newPostList, "posts");
    } else {
        res.status(404).send(`Post ${id} was not found`);
    }
});

//UPDATE ONE POST
app.put("/posts/:id", (req, res) => {
    let postList = readJSONFile("posts");
    let id = req.params.id;
    let newPost = req.body;
    newPost.id = id;
    let idFound = false;

    const newPostList = postList.map((post) => {
        if (post.id == id) {
            idFound = true;
            return newPost;
        }
        return post
    });

    writeJSONFile(newPostList, "posts");

    if (idFound) {
        res.json(newPost);
    } else {
        res.status(404).send(`Post ${id} was not found`);
    }

});

//GET ONE POST
app.get("/posts/:id", (req, res) => {
    const postList = readJSONFile("posts");
    const id = req.params.id;
    let idFound = false;
    let foundPost = null;

    postList.forEach(post => {
        if (id == post.id) {
            idFound = true;
            foundPost = post;
        }
    });

    if (idFound) {
        res.json(foundPost);
    } else {
        res.status(404).send(`post ${id} was not found`);
    }
});

// Functia de citire din fisierul db.json
function readJSONFile(objType) {
    if(objType === "book")
        return JSON.parse(fs.readFileSync(pathBooks))[objType];
    else
        return JSON.parse(fs.readFileSync(pathPosts))[objType];
};

// Functia de scriere in fisierul db.json
function writeJSONFile(content, objType) {

    let obj = {}, path = null;
    obj[objType] = content;

    if(objType === "book")
        path = pathBooks;
    else
        path = pathPosts;

    fs.writeFileSync(
        path,
        JSON.stringify(obj),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}


app.use(express.static('../'));

// Pornim server-ul
app.listen("3000", () =>
    console.log("Server started at: http://localhost:3000")
);