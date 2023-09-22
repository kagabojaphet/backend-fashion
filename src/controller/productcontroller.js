import Product from "../model/product";
import sendemail from "../utils/email";
import errormessage from "../utils/errormessage";
import successmessage from "../utils/successmessage";
import USER from "../model/user";

class productcontroller{
    static async createproduct(req,res){
        const {productimage,productname,productinfo,producttype,productcost,comment}=req.body
        const product=await Product.create({productimage,productname,productinfo,producttype,productcost,comment})
        if(!product){
            return errormessage(res,401,`product not uploaded`)
        }
        else{
            const users=await USER.find();
            users.map((used)=>{
                sendemail(used,product)
            })
            return successmessage(res,201,`product successfuly uploqded`,product)
        }
    }


    static async getoneproduct(req,res){
        const id=req.params.id
        const product=await Product.findById(id)
        if(!product){
            return errormessage(res,401,`product not found`)
        }
        else{
            return successmessage(res,200,`product successfuly retrieved`,product)
        }
    }

    static async getallproduct(req,res){
        const product=await Product.find()
        if(!product){
            return errormessage(res,401,`product found`)
        }
        else{
            return successmessage(res,200,`product successfuly ${product.length} found`,product)
        }
    }


    static async deleteoneproduct(req,res){
        const id=req.params.id
        const product=await Product.findByIdAndDelete(id)
        if(!product){
            return errormessage(res,401,`product with id ${id} not found`)
        }
        else{
            return successmessage(res,200,`product successfuly deleted`)
        }
    }

    static async deleteallproduct(req,res){
        const product=await Product.deleteMany()
        if(!product){
            return errormessage(res,401,`product not deleted`)
        }
        else{
            return errormessage (res,200,`all product successfuly deleted`)
        }
    }
    

    static async updateproduct(req,res){
        const id=req.params.id
        const product=await Product.findByIdAndUpdate(id,req.body,{new:true})
        if(!product){
            return errormessage(res,401,`product with id ${id} not update`)
        }
        else{
            return successmessage(res,200,`product successfuly updated`,product)
        }
    }

    static async createlikes(req,res){
        const id=req.params.id
        const prolike=await Product.findById(id)
        if(!prolike){
            return errormessage(res,401,` product with id ${id} not found`)
        }
        else{
            const userid = req.user._id;
            if (prolike.likes.includes(userid)) {
                return errormessage(res,401,`already you liked our product`)
            }
            else{
                if(prolike.dislikes.includes(userid)){
                    prolike.dislikes.pull(userid);
                }
                prolike.likes.push(userid);
                prolike.save();
                return successmessage(res,200,`like from ${req.user.firstname}`,prolike)
            }
            // prolike.likes +=1;
            // await prolike.save()
            // return successmessage(res,200,`you liked ${prolike.likes}`,prolike)
        }
    }

    static async createdislikes(req,res){
        const id=req.params.id
        const prodislike=await Product.findById(id)
        if(!prodislike){
            return errormessage(res,401,`product with id ${id} not found`)
        }
        else{
             const userid=req.user._id;
             if(prodislike.likes.includes(userid)){
                prodislike.likes.pull(userid);
             }
             prodislike.dislikes.push(userid);
             prodislike.save();
             return successmessage(res,200,`you dislike ${req.user.firstname}`)

            // prodislike.dislikes +=1;
            // await prodislike.save()
            // return successmessage(res,200,`you disliked ${prodislike.dislikes}`,prodislike)
        }

    }
}
export default productcontroller