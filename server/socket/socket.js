const Server = require("socket.io");
const http = require("http");
const express = require("express");
const { StartCall } = require("./videoCall");

const app = express();
app.enable("trust proxy");

const server = http.createServer(app);

const io = Server(server, {
    cors: {
        origin: "*",
        menthods: ["GET", "POST", "PUT", "DELETE"],
    },
});


const socketMap = {};
const peerMap = {};

const getSocketId = (userId) => {
    if (socketMap[userId]) {
        return socketMap[userId];
    }
    return null;
};


io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    const peerId = socket.handshake.query.peerId;
    if (userId) {
        socketMap[userId] = socket.id;
        if (peerId) {
            peerMap[userId] = peerId;
        }
        // console.log(peerMap);
    }
    socket.emit("online", Object.keys(socketMap));
    socket.emit("peerMap", peerMap);
    StartCall(socket, peerMap, getSocketId);
    socket.on("disconnect", () => {
        if (userId) {
            delete socketMap[userId];
            delete peerMap[userId];
        }
        socket.emit("online", Object.keys(socketMap));
        socket.emit("peerMap", peerMap);
    });
});

module.exports = { app, io, server, getSocketId };