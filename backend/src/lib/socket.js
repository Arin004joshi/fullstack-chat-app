import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    },
});

// function that returns the socketId
export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// use to store online users
const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    // send events to all the connected users
    io.emit("getOnlineusers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineusers", Object.keys(userSocketMap));
    })
})

export { io, app, server };