const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { verifyToken, verifyAdmin } = require('../utils/verifyToken');

// Add a new books
router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            pages: req.body.pages,
            genre: req.body.genre
        });
        await newBook.save();
        res.status(200).send("Book added successfully");
    } catch(err) {
        res.status(500).send("Internal server error");
    }
});

// Get all books
router.get('/get', verifyAdmin, async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).send(books);
    } catch(err) {
        res.status(500).send("Internal server error");
    }
});

// Get a book by id
router.get('/get/:id', verifyToken, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).send(book);
    } catch(err) {
        res.status(500).send("Internal server error");
    }
});

// Delete a book
router.delete('/delete/:id', verifyAdmin, async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).send("Book deleted successfully");
    } catch(err) {
        res.status(500).send("Internal server error");
    }
});

module.exports = router;