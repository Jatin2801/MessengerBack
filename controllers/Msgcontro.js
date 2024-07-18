import Conversation from '../models/conversation.js'
import Message from '../models/messege.js';

export const sendMsg = async (req,res) => {
try{
const{message} = req.body; // jo bhi msg type kiya 
const{id : receiverId} = req.params; // this is destruc. other way is (const receiverId = req.params.id)
const senderId = req.user._id // currently authenticated user 

// find conver. b/w these two users 
let conversation = await Conversation.findOne({
    participants: {$all: [senderId,receiverId]} // find a conversation where participants array contain senderId,receiverId fields 
})

//if no conver. occurred b/w two 
if(!conversation){
    conversation = await Conversation.create({ // create a new conversation 
        participants : [senderId,receiverId]
    })
}
// now create the new msg 
const newMsg = new Message({
    senderId : senderId,
    receiverId, // also one way to write when name is same 
    message : message 
})

if(newMsg){
    conversation.messages.push(newMsg._id)
}
res.status(201).json(newMsg)
}catch(error){
console.log('Error In Sending Message' , error.message)    
res.status(500).json({error : "Internal Server Error"})
}
}