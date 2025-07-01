import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

// the "next" var lets us call the next function, waiting after the protectRoute has been called

//This middleware is verifying the user's token from cookies to ensure that the user is authenticated before allowing access to protected routes.
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({ message: "Unauthorized - No token Provided" })
        }

        //validates the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({ message: "Unauthorized - Invalid token" })
        }

        const user = await User.findById(decoded.userId).select("-password");
        console.log(decoded.userId);
        if (!user) {
            res.status(400).json({ message: "User not found" })
        }
        req.user = user; //This is the authenticated user
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}
