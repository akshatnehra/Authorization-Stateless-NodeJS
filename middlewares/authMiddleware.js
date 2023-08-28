const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        // 3 ways to get token
        const token = req.cookies.token || req.body.token || req.header("authorization").replace("Bearer ", "");
        if(!token) {
            return res.status(401).json({
                message: "Token missing.",
                success: false
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error.",
            success: false
        });
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.role !== "Admin") {
            return res.status(403).json({
                message: "You are not authorized to access this route, only for ADMIN",
                success: false
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error.",
            success: false
        });
    }
}

exports.isStudent = (req, res, next) => {
    try {
        if(req.user.role !== "Student") {
            return res.status(403).json({
                message: "You are not authorized to access this route, only for STUDENT",
                success: false
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error.",
            success: false
        });
    }
}