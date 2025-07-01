import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import messageRoutes from "./routes/message.route.js"
import cors from "cors"

dotenv.config();
const PORT = process.env.PORT;

const app = express();

//extracts the json data out of body
// do this before calling the routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

//to extract the cookie
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/auth", messageRoutes);

app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
    connectDB();
})  