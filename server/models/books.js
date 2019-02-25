/**
 * File name: models/books.js
 * Author's name: Nusrat Jahan
 * Student Id: 300967157
 * Web App name: Favourite Book List
 */

let mongoose = require('mongoose');

// create a model class
let booksSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('books', booksSchema);
