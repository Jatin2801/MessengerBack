import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    username:{
        type: String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    gender : {
        type : String,
        required : true , 
        enum : ["male","female"] // as there are only two genders 
    },
    profilepic : {
        type : String,
        default:""
    }
},{ timestamps : true }) // created , updated at

const User = mongoose.model("User",userschema) // here we created the model with userschema

export default User;
