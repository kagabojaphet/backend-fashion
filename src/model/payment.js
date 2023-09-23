import mongoose from "mongoose";

const paymentschema=new mongoose.Schema({
    products:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    },
    paymentmethods:{
        type:String,
        enum:["creditcard","mastercard","paypal","mobilemoney"],
        default:"mobilemoney"
    },
    paiddate:{
        type:Date,
        default:Date.now()
    }
})
paymentschema.pre(/^find/,function(next){
    this.populate({
        path:"products",
        select:"productname"
    })
    next()

});
paymentschema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"firstname lastname  username email"
    })
    next()
})
const Payment=mongoose.model("Payment",paymentschema)

export default Payment