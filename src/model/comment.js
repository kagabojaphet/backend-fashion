import mongoose from "mongoose";

const commentschema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    },
    comment:{
        type:String,
    },
    createddate:{
        type:Date,
        default:Date.now()
    }
})
commentschema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"firstname lastname  email"
    })
    next()
})

const COMMENT= mongoose.model("COMMENT",commentschema)
export default COMMENT