// 1. import mongoose
const mongoose = require("mongoose");

// 2. create schema for entity
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  genre: { type: String },
  numberOfPages: { type: Number },
  progress: { type: Number, default: 0 },
  rating: { type: Number, min: 1, max: 5 },

  // Foreign Key -> User
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

// 3. create model of schema
const Book = mongoose.model("Book", bookSchema);

// 4. CRUD functions

// CREATE a book
async function createBook(
  title,
  description,
  genre,
  numberOfPages,
  progress,
  rating,
  userId
) {
  const newBook = await Book.create({
    title,
    description,
    genre,
    numberOfPages,
    progress,
    rating,
    userId
  });

  return newBook._doc;
}

// READ all books for a user
async function getBooksByUser(userId) {
  return await Book.find({ userId });
}

// READ one book
async function getBook(id) {
  return await Book.findById(id);
}

// UPDATE a book
async function updateBook(id, updates) {
  const book = await Book.findByIdAndUpdate(
    id,
    updates,
    { new: true }
  );

  return book._doc;
}

// DELETE a book
async function deleteBook(id) {
  await Book.deleteOne({ _id: id });
}

// 5. export functions
module.exports = {
  createBook,
  getBooksByUser,
  getBook,
  updateBook,
  deleteBook
};