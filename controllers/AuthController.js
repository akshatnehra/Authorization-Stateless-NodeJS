const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.login = async (req, res) => {
    try {
        // Fetch user data from request body
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: "Please enter all required fields.",
                success: false
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        
        if(!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid credentials.",
                success: false
            });
        }

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        }
        // Create token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
        user.token = token;
        
        // remove password from user object
        user.password = undefined;
        
        const options = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.cookie("token", token, options).status(200).json({
            message: "User logged in successfully.",
            success: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
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