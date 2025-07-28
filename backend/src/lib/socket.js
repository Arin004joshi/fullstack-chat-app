// src/lib/socket.js - Updated CORS configuration
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://fullstack-chat-app-e6ut.onrender.com",
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    },
});

// Store online users
const userSocketMap = {};

// Get receiver socket ID by userId
export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // This retrieves the userId passed by the frontend when connecting
    const userId = socket.handshake.query.userId;

    if (!userId) {
        console.warn("Connection attempt without userId, disconnecting:", socket.id);
        socket.disconnect();
        return;
    }

    userSocketMap[userId] = socket.id;
    io.emit("getOnlineusers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineusers", Object.keys(userSocketMap));
    });
});

export { io, app, server };