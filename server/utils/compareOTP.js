const OTP = require("../models/otpModel");

const compareOTP = async (email, otp) => {
    try {
        const userotp = await OTP.findOneAndDelete({ email, otp });
        if (userotp) {
            return true;
        }
        return false;
    } catch (error) {
        console.log("error in compareOTP" + error);
        return false;
    }
}

module.exports = compareOTP;