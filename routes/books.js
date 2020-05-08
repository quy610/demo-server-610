const router = require('express').Router();
const Book = require('../models/Book');

router.get('/', async(req, res) => {
    const bookList = await Book.find();
    res.send(bookList);
});

module.exports = router;