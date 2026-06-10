// 1. import any needed libraries
const express = require("express");
const Book = require("../models/book");
const router = express.Router();

// 2. create all routes to access database
router

  // CREATE BOOK
  .post("/create", async (req, res) => {
    try {
      const book = await Book.createBook(
        req.body.title,
        req.body.description,
        req.body.genre,
        req.body.numberOfPages,
        req.body.progress,
        req.body.rating,
        req.body.userId
      );

      res.send(book);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  })

  // GET ALL BOOKS FOR A USER
  .get("/user/:userId", async (req, res) => {
    try {
      const books = await Book.getBooksByUser(
        req.params.userId
      );

      res.send(books);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  })

  // GET SINGLE BOOK
  .get("/:id", async (req, res) => {
    try {
      const book = await Book.getBook(req.params.id);

      res.send(book);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  })

  // UPDATE BOOK
  .put("/update", async (req, res) => {
    try {
      const book = await Book.updateBook(
        req.body.id,
        {
          title: req.body.title,
          description: req.body.description,
          genre: req.body.genre,
          numberOfPages: req.body.numberOfPages,
          progress: req.body.progress,
          rating: req.body.rating
        }
      );

      res.send(book);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  })

  // DELETE BOOK
  .delete("/delete", async (req, res) => {
    try {
      await Book.deleteBook(req.body.id);

      res.send({ success: "Book deleted" });
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  });

// 3. export router for use in index.js
module.exports = router;