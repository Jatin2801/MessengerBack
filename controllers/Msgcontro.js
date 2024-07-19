import Conversation from '../models/conversation.js'
import Message from '../models/messege.js';

export const sendMsg = async (req, res) => {
    try {
        const { message } = req.body; // jo bhi msg type kiya 
        const { id: receiverId } = req.params; // this is destruc. other way is (const receiverId = req.params.id) and this one is used in route 
        const senderId = req.user._id // currently authenticated user 

        // find conver. b/w these two users 
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] } // find a conversation where participants array contain senderId,receiverId fields 
        })

        //if no conver. occurred b/w two 
        if (!conversation) {
            conversation = await Conversation.create({ // create a new conversation 
                participants: [senderId, receiverId]
            })
        }
        // now create the new msg 
        const newMsg = new Message({
            senderId: senderId,
            receiverId, // also one way to write when name is same 
            message: message
        })

        if (newMsg) {
            conversation.messages.push(newMsg._id)
        }

        // await conversation.save()
        // await newMsg.save() instead of this we did in below way 

        await Promise.all([conversation.save(), newMsg.save()]) // this will happen in parallel

        res.status(201).json(newMsg)
    } catch (error) {
        console.log('Error In Sending Message', error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getMsg = async (req, res) => {
    try {
        const { id: userToChatId } = req.params; //changed id name to userToChatId
        const senderId = req.user._id  // coming from the protectRoute 

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if(!conversation){
            res.status(200).json([]) // retrun empty array
        }

        const messages = conversation.messages

        res.status(200).json(messages) // this will give the array of msgs 
    } catch (error) {
        console.log('Error In Sending Message', error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}