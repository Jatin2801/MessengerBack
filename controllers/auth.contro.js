import User from "../models/user.js"
import bcrypt from 'bcryptjs' // to hide/hash the password in DB 
import generateTokenandSetcookie from "../utils/generateToken.js"

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmpass, gender } = req.body // req.body is the input we will paas 
        if (password != confirmpass) {
            return res.status(400).json({ error: "Password and confirmpass do not match" })
        }
        const user = await User.findOne({ username }) // it will check if username exists in DB
        if (user) { // if user already exists
            return res.status(400).json({ error: "User Already Exists" })
        }
        // Hash Passwoed Here 
        const salt = await bcrypt.genSalt(10); // the higher the num value the secure it is but slow as well
        const hashedpass = await bcrypt.hash(password, salt);

        // Profile Pic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({ // here we are creating a new user by the input values and here we put the name of schema (User here)
            fullname: fullname,
            username, // as value in schema and input are same just use keyword 
            password: hashedpass,
            gender,
            profilepic: gender === 'male' ? boyProfilePic : girlProfilePic
        })
        if (newUser) { // if new User is being created 
            // Generate JWT token here for the new user 
            // generateTokenandSetcookie(newUser._id , res)

            await newUser.save() // save it to DB   and program will not move on until this is completed bcoz of await

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname, // .fullname is the fieldname 
                username: newUser.username,
                profilepic: newUser.profilepic
            })
        } else {
            res.status(400).json({ error: 'Invalid User Data' })
        }
    }
    catch (error) {
        console.log('Err in Signup Controller ', error.message)
        return res.status(500).json({ error: "Interne Server Error" })
    }
}

export const login = async (req, res) => {
try{
const{username,password} = req.body; 
const user = await User.findOne({username})//

// compare entered pass with pass in DB user.password is the entered one
const ispasscorrect = await bcrypt.compare(password,user?.password || "") //  we need to add empty string otherwise it will throw error 
if(!user || !ispasscorrect){
    return res.status(400).json({error:'Invalid Crediantials '})
}
generateTokenandSetcookie(user._id,res)

res.status(200).json({
    _id : user._id,
    fullname: user.fullname,
    username : user.username,
    profilepic: user.profilepic,
})
} catch (error) {
    console.log('Err in Login Controller ', error.message)
   return res.status(500).json({ error: "Interne Server Error" })
}
}

export const logout = (req, res) => {
    try{
        res.cookie('jwt','',{maxAge:0}) // we cleared the cookie here and here by '' this we set the jwt to empty string 
       return res.status(200).json({message:"Logged Out Sucessfully"}) // by maxAge we specifies the cookie should expire immediatially 
    }
    catch (error) {
        console.log('Err in Logout Controller ', error.message)
       return res.status(500).json({ error: "Interne Server Error" })
    }
}
