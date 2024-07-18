const jwt = require('jsonwebtoken');

const genToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie('token', token, {
        expires: new Date(
            Date.now() + 15 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    });
};

module.exports = genToken;