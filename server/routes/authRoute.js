const express = require('express');
const { signup, login, fortgotPassword, verifyOtp, signupOtp } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgetpassword', fortgotPassword);
router.post('/verifyotp', verifyOtp);

module.exports = router;