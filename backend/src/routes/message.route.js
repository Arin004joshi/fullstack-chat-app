import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersFromSidebar,getMessages,sendMessages } from "../controllers/message.controller.js";

const messageRoutes = express.Router();

// to view all the contacts of a user
messageRoutes.get("/users",protectRoute,getUsersFromSidebar)

// to recieve messages
messageRoutes.get("/:id",protectRoute,getMessages);

// to send messages
messageRoutes.post("/send/:id",protectRoute,sendMessages);

export default messageRoutes;