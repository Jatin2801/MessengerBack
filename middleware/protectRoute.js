import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const protectRoute = async (req, res, next) => {
    try { // we need to import cookie-parser in server.js file 
        const token = req.cookies.jwt; // we requested the token from cookies and we need to import cookie-parser in server.js 
        if (!token) {
            return res.status(401).json({ error: "Unauthorised Access -  No token provided " })
        }
        // if token is present 
        const decode = jwt.verify(token, process.env.JWT_SECRET) // verify token and returns the data stored in token 
        if (!decode) {
            return res.status(401).json({ error: "Unauthorised Access - wrong token provided" })
        }
        // const user = await User.findById(decode.userId).select("-password") // this is userId as we called it the same in generateTokenandSetcookie
        // if(!user) {
        //     return res.status(404).json({ error: "User Not Found" })
        // }
        // // when it passes all checks 
        // req.user = user // user is auththenticated i.e the user here is the same user as in our DB 

        next()
    } catch (error) {
        console.log('Error in protectRoute middleware', error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export default protectRoute