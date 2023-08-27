const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.login = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.signup = async (req, res) => {
    try {
        // Get user data from request body
        const { name, email, password, role } = req.body;
        
        // check if user already exists
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists.",
                success: false
            });
        }

        // Secure user password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong in hashing password.",
                success: false
            });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        const createdUser = await newUser.save();

        return res.status(201).json({
            message: "User created successfully.",
            success: true,
            user: createdUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
}