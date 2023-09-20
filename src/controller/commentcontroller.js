import COMMENT from "../model/comment";
import Product from "../model/product";
import errormessage from "../utils/errormessage";
import successmessage from "../utils/successmessage";

class commentcontroller{
    static async createcomment(req,res){
        const idproduct=req.params.id
        req.body.user=req.user._id
        const comment=await COMMENT.create(req.body)
        const products=await Product.findByIdAndUpdate({_id:idproduct},{$push:{comment:comment}},{new:true})
       
        if(!products){
        return errormessage(res,401,`comment not posted`)
    }
    else{
        return successmessage(res,200,`comment successfuly posted`,products)
    }
    }
  static async getallcomment(req,res){
        const comment=await COMMENT.find()
        if(!comment){
            return errormessage(res,401,`comment not found`)
        }
        else{
            return successmessage(res,200,`all comment ${comment.length}successfuly retrieved`,comment)
        }
    } 
    static async getonecomment(req,res){
        const id=req.params.id
        const comment=await COMMENT.findById(id)
        if(!comment){
            return errormessage(res,401,`comment with id ${id} not found`)
        }
        else{
            return successmessage(res,200,`comment successfuly retrieved`,comment)
        }
    }    
    static async deleteonecomment(req,res){
        const id=req.params.id
        const comment=await COMMENT.findByIdAndDelete(id)
        if(!comment){
            return errormessage(res,401,`comment with id ${id} not deleted`)
        }
        else{
            return successmessage(res,200,`comment successfuly deleted`)
        }

    }
    static async deleteallcomment(req,res){
        const comment=await COMMENT.deleteMany()
        if(!comment){
            return errormessage(res,401,`comment not deleted`)
        }
        else{
            return successmessage(res,200,`all comment successfuly deleted`)
        }
    }
}
export default commentcontroller