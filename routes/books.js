const router = require('express').Router();
const Book = require('../models/Book');


// Create a new book
router.post('/', async(req, res) => {
    const newBook = new Book({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description
    });

    try {
        const saveBook = await newBook.save();
        res.send(saveBook);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Retrieve all books
router.get('/', async(req, res) => {
    try {
        const bookList = await Book.find();
        res.send(bookList);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Retrieve a single book with Id
router.get('/:bookId', async(req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        res.send(book);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update a book with Id
router.put('/:bookId', async(req, res) => {
    try {
        const updateBook = await Book.findByIdAndUpdate(req.params.bookId, {
            title: req.body.title,
        }, {new: true});
        res.send(updateBook);
    } catch (err) {
        res.send(err);
    }
});

// Delete a book with Id
router.delete('/:bookId', async(req, res) => {
    try {
        const delBook = await Book.findByIdAndRemove(req.params.bookId);
        const listBooks = await Book.find();
        res.send(listBooks);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;