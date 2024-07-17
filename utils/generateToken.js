import jwt from 'jsonwebtoken'

const generateTokenandSetcookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn : '15d'
    })
    res.cookie('jwt',token,{ // jwt is the name of the cookie 
        maxAge : 15 * 24 * 60 * 1000 , // ms format
        httpOnly: true , // so it cant be accessed by JS 
        sameSite : "strict" ,
        secure : process.env.NODE_ENV !== "development",
    })
}

export default generateTokenandSetcookie;