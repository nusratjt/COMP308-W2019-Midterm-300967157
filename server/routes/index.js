/**
 * File name: routes/index.js
 * Author's name: Nusrat Jahan
 * Student Id: 300967157
 * Web App name: Favourite Book List
 */

// modules required for routing
let express = require('express');
let router = express.Router();

// define the b0ok model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home Page' 
   });
});

/* GET book list page. wildcard */
router.get('/book-list', (req, res, next) => {
  res.render('content/index', {
    title: 'My Favourite Books'
   });
});


module.exports = router;
