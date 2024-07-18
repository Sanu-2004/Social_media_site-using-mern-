const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: 600 },
    },
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;