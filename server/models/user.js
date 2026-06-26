// 1. import mongoose
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// 2. create schema for entity
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true }
});

// 3. create model of schema
const User = mongoose.model("User", userSchema);

// 4. CRUD functions

// CREATE a user
async function register(username, fullName, password, email) {
  const user = await getUser(username);

  if (user) throw Error("Username already in use");

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    fullName,
    password,
    email
  });

  return newUser._doc;
}

// READ a user
async function login(username, password) {
  const user = await getUser(username);

  if (!user) throw Error("User not found");
  
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) throw Error('Wrong Password');

  return user._doc;
}

// UPDATE user password
async function updatePassword(id, password) {
  const user = await User.findByIdAndUpdate(
    id,
    { password },
    { new: true }
  );

  return user._doc;
}

// DELETE a user
async function deleteUser(id) {
  await User.deleteOne({ _id: id });
}

// Utility function
async function getUser(username) {
  return await User.findOne({ username });
}

// 5. export functions
module.exports = {
  register,
  login,
  updatePassword,
  deleteUser
};