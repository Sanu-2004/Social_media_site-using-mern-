const nodemailer = require("nodemailer");
const OTP = require("../models/otpModel");



const sendOTP = async (email, msg) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user : process.env.SENDER_MAIL,
            pass : process.env.MAIL_KEY,
        },
    });
    try {
        await transporter.sendMail({
            from: process.env.SENDER_MAIL,
            to: email,
            subject: `Your OTP for ${msg}`,
            text: `Your OTP is ${otp}`,
        });

        const userotp = new OTP({ email, otp });
        await userotp.save();

        return otp;
    } catch (error) {
        console.log("error in sendOTP" + error);
        return
    }
}

module.exports = sendOTP;
