import mongoose from "mongoose";
import User from "./user.js";
const conschema = new mongoose.Schema({
participants : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
    }
],
messages : [
    {
        type : mongoose.Schema.Types.ObjectId, // it will take the objectId of Message model 
        ref : 'Message', // so we will store message in messages array 
        default : [], // initially its empty array then insert msgs in it , its not just ref but actual msg
    }
]
},{timestamps:true})

const Conversation = mongoose.model("Conversation" , conschema)

export default Conversation; 