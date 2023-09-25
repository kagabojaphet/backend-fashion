import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,

    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    createdat:{
        type:Date,
        default:Date.now()
    }
})
const USER=mongoose.model("USER",userschema)
export default USER