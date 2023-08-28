const express = require('express');
const router = express.Router();

const { login, signup } = require('../controllers/AuthController');
const { isStudent, isAdmin, auth } = require('../middlewares/authMiddleware');

router.post('/login', login);
router.post('/signup', signup);

// Use Middlewares
router.get('/student', auth, isStudent, (req, res) => {
    res.status(200).json({
        message: "You are a student.",
        success: true
    });
});

router.get('/admin', auth, isAdmin, (req, res) => {
    res.status(200).json({
        message: "You are an admin.",
        success: true
    });
});

module.exports = router;