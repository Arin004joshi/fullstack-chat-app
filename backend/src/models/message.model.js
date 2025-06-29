import mongoose from "mongoose";
 
const messageSchema = new mongoose.Schema(
    {
        // both sender and receiver are type of Users
        senderId : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
            required : true,
        },
        receiverId : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
            required : true,
        },
        text : {
            type : String,
        },
        image : {
            type : String,
        },
    },
    // for things like "msg sent at 12am .."
    {timestamps : true}
)

const Message = mongoose.model("Message",messageSchema);

export default Message;