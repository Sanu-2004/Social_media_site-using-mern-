const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authorizeUser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(verify.id).select("-password");
    if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
};

module.exports = authorizeUser;