import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log("Received body:", req.body);

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //validate password
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" });
        }

        //validate email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //generate hash for the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const user = new User({
            email,
            fullName,
            password: hashedPassword,
        })
        if (user) {
            //after creating a new user, generate and send the jwt token in a cookie
            generateToken(user._id, res);
            await user.save();

            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic,
            })
        } else {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}

//in login or signin we need to check for malicious users i.e the user should not know which one of the credentials is incorrect
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



//in logout, we just need to clear out the cookies
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "You have been logged out successfully" })
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}


export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;

        //to get to know for which user the pfp is being updated
        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - No user found" });
        }

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" })
        }

        if (!profilePic.startsWith("data:image")) {
            return res.status(400).json({ message: "Invalid image format" });
        }

        //if pfp is given then store it in cloudinary
        let uploadResponse;

        //pfp has been updated in the cloudinary but not in our database
        try {
            uploadResponse = await cloudinary.uploader.upload(profilePic);
        } catch (err) {
            console.error("Cloudinary upload error:", err);
            return res.status(500).json({ message: "Image upload failed" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in profile-update controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}