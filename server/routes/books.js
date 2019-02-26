/**
 * File name: routes/books.js
 * Author's name: Nusrat Jahan
 * Student Id: 300967157
 * Web App name: Favourite Book List
 */

// modules required for routing
let express = require('express');
let router = express.Router();

// define the book model
let book = require('../models/books');

function requireAuth(req, res, next) {

    // check if the user is logged in
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET books List page. READ */
router.get('/', requireAuth, (req, res, next) => {
    // find all books in the books collection
    book.find((err, bookList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('books/index', {
                title: 'Books',
                bookList: bookList,
                displayName: req.user ? req.user.displayName : ""
            });
        }
    });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', requireAuth, (req, res, next) => {

    // get the book insertion form page
    res.render('books/details', {
        title: 'Add New Book',
        books: '',
        displayName: req.user ? req.user.displayName : ""
        
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', requireAuth, (req, res, next) => {

    // create new book model
    let newBook = book({
        "Title": req.body.title,
        "Description": req.body.description,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });

    book.create(newBook, (err, book) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the book list
            res.redirect('/books');
        }
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', requireAuth, (req, res, next) => {

    let id = req.params.id; //create an id

    book.findById(id, (err, bookObject) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // show the edit view
            res.render('books/details', {
                title: 'Edit Book',
                books: bookObject,
                displayName: req.user ? req.user.displayName : ""

            });
        }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', requireAuth, (req, res, next) => {

    let id = req.params.id; //create an id

    // create updated book model
    let updatedBook = book({
        "_id": id,
        "Title": req.body.title,
        "Description": req.body.description,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });

    book.update({ _id: id }, updatedBook, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/books');
        }
    })

});

// GET - process the delete by user id
router.get('/delete/:id', requireAuth, (req, res, next) => {

    let id = req.params.id;  //create an id

    book.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/books');
        }
    });
});


module.exports = router;
