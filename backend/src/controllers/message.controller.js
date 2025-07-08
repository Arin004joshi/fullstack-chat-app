import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js"; 

export const getUsersFromSidebar = async (req, res) => {
    try {
        // returns the current user
        const loggedInUser = req.user._id;

        // find all the users except the current user
        const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        res.status(200).json({ filteredUser });
    } catch (error) {
        console.error("Error in getUsersFromSidebar", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })
            .sort({ createdAt: 1 }) // Optional: sort by oldest first
            .lean(); // Removes Mongoose metadata to avoid circular refs

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // handle the image case
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        // now update the message
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        await newMessage.save();

        // real-time functionality goes here ------->>>>
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // if the user is online, inform the receiver to listen to the event
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}