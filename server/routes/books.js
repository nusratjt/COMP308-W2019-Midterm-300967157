// modules required for routing
let express = require('express');
let router = express.Router();

// define the book model
let booksModel = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
    // find all books in the books collection
    booksModel.find((err, bookList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('books/index', {
                title: 'Books',
                bookList: bookList
            });
        }
    });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    res.render('books/add', {
        title: 'Add New Book'
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    let newBook = booksModel({
        "Title": req.body.title,
        "Description": req.body.description,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });

    booksModel.create(newBook, (err, booksModel) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the book list
            res.redirect('/book-list');
        }
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    let id = req.params.id;

    booksModel.findById(id, (err, bookObject) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // show the edit view
            res.render('books/details', {
                title: 'Edit Book',
                books: bookObject

            });
        }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    let id = req.params.id;

    let updatedBook = booksModel({
        "_id": id,
        "Title": req.body.title,
        "Description": req.body.description,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });

    booksModel.update({ _id: id }, updatedBook, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/book-list');
        }
    })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    let id = req.params.id;

    booksModel.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/book-list');
        }
    });
});


module.exports = router;
