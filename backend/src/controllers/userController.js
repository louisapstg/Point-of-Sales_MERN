import asyncHanlder from 'express-async-handler';
import User from '../models/userModel.js';

const registerUser = asyncHanlder(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all required fields");
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

});

export {
    registerUser
}