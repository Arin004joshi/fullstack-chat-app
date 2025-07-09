import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersFromSidebar, getMessages, sendMessages } from "../controllers/message.controller.js";

const router = express.Router(); // Changed from 'messageRoutes' to 'router' for consistency

// to view all the contacts of a user
router.get("/users", protectRoute, getUsersFromSidebar);

// to receive messages - Make sure the parameter is properly defined
router.get("/:id", protectRoute, getMessages);

// to send messages - Make sure the parameter is properly defined
router.post("/send/:id", protectRoute, sendMessages);

export default router;