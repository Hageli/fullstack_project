const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken, verifyAdmin } = require('../utils/verifyToken');

// Register a new user
router.post('/register', async (req, res, next) => {
    // Check if email already exists
    const tempUser = await User.findOne({email: req.body.email});
    if(!tempUser) {
        const tempRole = await Role.find({role: "User"});
        // Hash password
        const hashedPasword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPasword,
            admin: false,
            roles: tempRole
        });
        await newUser.save();
        res.status(200).send("User registered successfully");
    } else {
        res.status(400).send("Email already exists");
    }
    
});

// Login a registered user
router.post('/login', async (req, res, next) => {
    const tempUser = await User.findOne({name: req.body.name});
    // Check if user exists
    if(tempUser) {
        const comparePassword = await bcrypt.compare(req.body.password, tempUser.password);
        // Check if password is correct
        if(comparePassword) {
            const token = jwt.sign({user: tempUser}, process.env.SECRET);
            res.cookie('token', token, {httpOnly: true}).status(200).send("User logged in successfully");
        } else {
            res.status(400).send("Password is incorrect");
        }
    } else {
        res.status(400).send("User not found");
    }
});

// Get all users
router.get('/get', verifyAdmin, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch(err) {
        res.status(500).send("Internal server error");
    }
});

// Get a user by id
router.get('/get/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // Check if user exists
        if(user) {
            res.status(200).send(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch(err) {
        res.status(500).send("Internal server error");
    }
});

// Delete a user
router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // Check if user exists
        if(user) {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).send("User deleted successfully");
        } else {
            res.status(404).send("User not found");
        }
    } catch(err) {
        res.status(500).send("Internal server error");
    }
});

module.exports = router;