import User from "../models/user.js"

export const getUsersForSidebar = async (req,res) =>{
try {
    const loggedInUserId = req.get('user-id')
    const filteredUser = await User.find({ _id: {$ne : loggedInUserId}}).select('-password') // it will find all id , $ne means not equal to loggedInUserId
    res.status(200).json(filteredUser)
} catch (error) {
    console.error('Err in getUsersForSidebar',error.message)
     res.status(500).json({error:"Internal Server Error "})
}
}