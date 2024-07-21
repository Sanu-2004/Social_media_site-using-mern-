const bycrypt = require("bcryptjs");
const User = require("../models/userModel");
const genToken = require("../utils/genToken");
const sendOTP = require("../utils/sendOTP");
const compareOTP = require("../utils/compareOTP");


const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const regusername = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;


const signup = async (req, res) => {
    try {
        const { name, email, username, password, confirmPassword } = req.body;
        if (!name || !email || !password || !username || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (!regEmail.test(email)) {
            return res.status(400).json({ error: "Invalid email address" });
        }
        if (!regusername.test(username)) {
            return res.status(400).json({ error: "Invalid username" });
        }
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ error: "Email account already exists" });
        }

        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        const user = await User.create({ name, username, email, password: hashedPassword });
        genToken(user._id, res);

        res.status(201).json({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            linkers: user.linkers,
            linked: user.linked,
            profilePic: user.profilePic,
            bio: user.bio,
            link: user.link,
        });

    } catch (error) {
        console.log("error in signup" + error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (!regusername.test(username)) {
            return res.status(400).json({ error: "Invalid username" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            res.status(400).json({ error: "Invalid credentials" });
        } else {
            if (await bycrypt.compare(password, user.password)) {
                genToken(user._id, res);
                res.status(200).json({
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    linkers: user.linkers,
                    linked: user.linked,
                    profilePic: user.profilePic,
                    bio: user.bio,
                    link: user.link,
                });
            } else {
                res.status(400).json({ error: "Invalid credentials" });
            }
        }


    } catch (error) {
        console.log("error in login" + error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("error in logout" + error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const fortgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        if (!regEmail.test(email)) {
            return res.status(400).json({ error: "Invalid email address" });
        }
        const otp = await sendOTP(email, "Password Reset");

        if (!otp) {
            return res.status(500).json({ error: "Failed to send OTP" });
        }
        res.status(200).json({
            email,
            otp
        });
    } catch (error) {
        console.log("error in forgetpassword" + error);
        res.status(500).json({ error: "Internal Server" });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (!regEmail.test(email)) {
            return res.status(400).json({ error: "Invalid email address" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "No account found with this email" });
        }

        const verified = await compareOTP(email, otp);
        if (!verified) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        genToken(user._id, res);
        res.status(200).json({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        console.log("error in verifyOtp" + error);
        res.status(500).json({ error: "Internal Server" });
    }
};



module.exports = { signup, login, fortgotPassword, verifyOtp, logout };