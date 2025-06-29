import express from "express";  
const route = express.Router();
import { signup,login,logout,updateProfile,checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

route.post("/signup",signup)  
route.post("/login",login);
route.post("/logout",logout);

// protectRoute : authenticates the user before letting them to update their pfp
route.put("/update-profile",protectRoute,updateProfile);

// will work when the user refreshes the page and we need to check the credentials again
route.get("/check",protectRoute,checkAuth);

export default route;