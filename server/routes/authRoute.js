const express = require('express');
const { signup, login, fortgotPassword, verifyOtp, signupOtp, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgetpassword', fortgotPassword);
router.post('/verifyotp', verifyOtp);

module.exports = router;