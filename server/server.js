const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require('./db/connectDB.');
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const messaageRoute = require('./routes/messageRoute');
const notificatonRoute = require('./routes/notficationRoute');
const { app, server } = require('./socket/socket');


dotenv.config();
const PORT = process.env.Port || 5000;

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
        methods: "GET, POST",
    }
));
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.use("/api/message", messaageRoute);
app.use("/api/notification", notificatonRoute);


server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});