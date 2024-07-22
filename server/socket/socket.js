const Server = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);

const io = Server(server, {
    cors: {
        origin: "*",
        menthods: ["GET", "POST", "PUT", "DELETE"],
    },
});

const socketMap = {};

const getSocketId = (userId) => {
    if (socketMap[userId]) {
        return socketMap[userId];
    }
    return null;
};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        socketMap[userId] = socket.id;

    }
    socket.emit("online", Object.keys(socketMap));
    socket.on("disconnect", () => {
        if (userId) {
            delete socketMap[userId];
        }
        socket.emit("online", Object.keys(socketMap));
    });
});

module.exports = { app, io, server, getSocketId };