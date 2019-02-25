// modules required for routing
let express = require('express');
let router = express.Router();

// define the b0ok model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home' 
   });
});

/* GET book list page. wildcard */
router.get('/books', (req, res, next) => {
  res.render('content/index', {
    title: 'books'
   });
});


module.exports = router;
