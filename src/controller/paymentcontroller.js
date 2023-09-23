import Payment from "../model/payment";
import Product from "../model/product";
import errormessage from "../utils/errormessage"
import successmessage from "../utils/successmessage"

class paymentcontroller{
    static async createpayment(req,res){
        const id=req.params._id
        const prid=await Product.findById(id)
        req.body.user=req.user._id
        const payment=await Payment.create({_id:prid},req.body)
        // const product=await Product.findByIdAndUpdate({_id:proid},{$push:{products:payment}},{new:true})
        console.log(payment)
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