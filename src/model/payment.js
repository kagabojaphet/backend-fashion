import mongoose from "mongoose";

const paymentschema=new mongoose.Schema({
    products:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
 productCost:{
    type:Number
 },
 currency:{
    type:"String"
 },
 source:{
    type:"String"
 },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    },
  
    paiddate:{
        type:Date,
        default:Date.now()
    }
})
paymentschema.pre(/^find/,function(next){
    this.populate({
        path:"products",
        select:"productname productcost"
    }).populate({
        path:"user",
        select:"firstname lastname  username email"
    })
    next()

});

const Payment=mongoose.model("Payment",paymentschema)

export default Payment