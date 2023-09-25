import Payment from "../model/payment";
import Product from "../model/product";
import errormessage from "../utils/errormessage"
import successmessage from "../utils/successmessage"
import dotenv from 'dotenv'


dotenv.config()



class paymentcontroller{
    static async createpayment(req,res){
        req.body.user=req.user._id
       
        const id=req.params._id
            const prid=await Product.findById(id)
         
        
            if(!prid){
                return errormessage(res,401,`no product found`)
            }
        
            req.body.products=prid._id
            req.body.productCost=prid.productcost
            req.body.currency=prid.currency
            const amount=req.body.productCost
            const currency= req.body.currency
            const source=req.body.source
            const authHeader = req.headers['authorization'];
            
            if (!authHeader) {
              return res.status(401).json({ error: 'Authentication failed' });
            }
            const token=authHeader
         
        
            if (token !== process.env.STRIPE_SECRET_KEY) {
              return res.status(401).json({ error: 'Authentication failed' });
            }
      
          

            try {
           
                const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
                const payment = await stripe.paymentIntents.create({
                  amount:amount,
                  currency:currency

                
                });
             
               
        return successmessage(res,200,'payment succes',{ clientSecret: payment.client_secret })
               
              } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to create payment intent' });
              }
         
   
        // req.body.user=req.user._id
        // const payment=await Payment.create({_id:prid},req.body)
        // const product=await Product.findByIdAndUpdate({_id:proid},{$push:{products:payment}},{new:true})
    
        // const product=await Product.findByIdAndUpdate({_id:proid},{$push:{product:payment}},{new:true})
        
        // // console.log(product)
        // const payment=await Payment.create(req.body)
        // if(!product){
        //     return errormessage(res,401,`product with id ${proid} not found`)
        // }
        // else{
        //     return successmessage(res,201,`product successfult paid`,product)
        // }

    }
    static async getallpayment(req,res){
        const payment=await Payment.find()
        console.log(payment)
        // if(!payment){
        //     return errormessage(res,400,`payment not found`)
        // }
        // else{
        //     return successmessage(res,200,`all payment successfuly ${payment.length} retrieved`,payment)
        // }
    }
    static async deleteallpayment(req,res){
        const payment=await Payment.deleteMany()
        if(!payment){
            return errormessage(res,401,`payment not deleted`)
        }
        else{
            return successmessage(res,200,`all payment successfuly deleted`)
        }
}
}
export default paymentcontroller