import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:3000",
            "https://fullstack-chat-app-1-nt6g.onrender.com", // Your actual frontend URL
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie", "X-Requested-With"],
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

    const userId = socket.handshake.query.userId;

    // 🔒 Validate userId presence
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
