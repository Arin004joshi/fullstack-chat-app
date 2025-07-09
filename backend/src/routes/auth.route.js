import express from "express";
const router = express.Router(); // Changed from 'route' to 'router'
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// protectRoute : authenticates the user before letting them to update their pfp
router.put("/update-profile", protectRoute, updateProfile);

// will work when the user refreshes the page and we need to check the credentials again
router.get("/check", protectRoute, checkAuth);

export default router; // Changed from 'route' to 'router'