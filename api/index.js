const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CONNECTING TO MONGODB
mongoose.connect('mongodb://127.0.0.1:27017/fullstack');
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES

// Users router
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

// Roles router
const rulesRouter = require('./routes/roles');
app.use('/api/roles', rulesRouter);

// Books router
const booksRouter = require('./routes/books');
app.use('/api/books', booksRouter);

// Index route
app.get('/', (req, res) => {
    res.send("HOME");
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/*
Create a website with a list of books on one page

Another page with users information and the list of their favourite books

Users can add favourite books with buttons on the book card on another page

Admin dashboard with ability to add and delete a book, add and delete a role

*/