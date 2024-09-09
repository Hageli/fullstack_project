import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// REGISTER NEW USER
export const register = async (req, res) => {
    try {
        // GET ALL USER DATA FROM REQ.BODY
        const { firstName, lastName, email, password, picturePath, friends, location, occupation} = req.body
        
        // HASHING THE USER PASSWORD
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // CRETE NEW USER
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            // RANDOM VALUES FOR THESE SINCE THIS PROJECT WILL NOT BE DEPLOYED TO MASSIVE AUDIENCES
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })

        // SAVE NEW USER TO DB AND SEND SUCCESS RESPONSE
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: "User register failed", error: err.message})
    }
}

// LOGIN USER
export const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        
        // CHECK IF USER EXISTS
        const user = await User.findOne({ email: email })
        if(!user) {
            return res.status(400).json({ message: "User not found" })
        }
        
        // CHECK IF PASSWORDS MATCH
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(400).json({ message: "Invalid credentials "})
        }

        const token = jwt.sign({ id: user._id, }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user});

    } catch (err) {
        res.status(500).json({ message: "User login failed", error: err.message})

    }
}