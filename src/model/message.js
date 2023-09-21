import mongoose from "mongoose";

const messageschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    },
    message:{
        type:String,
        required:true
    },
    senddate:{
        type:Date,
        default:Date.now()
    }
})
messageschema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"firstname lastname username email"
    })
    next()
})

const MESSAGE=mongoose.model("MESSAGE",messageschema)
export default MESSAGE