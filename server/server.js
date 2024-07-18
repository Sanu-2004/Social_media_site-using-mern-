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


dotenv.config();
const PORT = process.env.Port || 5000;


const app = express();
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
        methods: "GET, POST",
    }
));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.use("/api/message", messaageRoute);
app.use("/api/notification", notificatonRoute);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});