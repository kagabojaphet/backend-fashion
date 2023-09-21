import MESSAGE from "../model/message";
import errormessage from "../utils/errormessage";
import successmessage from "../utils/successmessage";

class messagecontroller{
    static async createmessage(req,res){
        req.body.user=req.user._id
        const messages=await MESSAGE.create(req.body)
        if(!messages){
            return errormessage(res,401,`message not created`)
        }
        else{
            return successmessage(res,200,`message successfuly created`,messages)
        }
    }

    static async getallmessage(req,res){
        const messages=await MESSAGE.find()
        if(!messages){
            return errormessage(res,401,`message not found`)
        }
        else{
            return successmessage(res,200,`all message ${messages.length} successfuly retrieved`,messages)
        }
    } 
    static async getonemessage(req,res){
        const id=req.params.id
        const messages=await MESSAGE.findById(id)
        if(!messages){
            return errormessage(res,401,`message with id ${id} not found`)
        }
        else{
            return successmessage(res,200,`message successfuly retrieved`,messages)
        }
    } 

    static async deleteonemessage(req,res){
        const id=req.params.id
        const messages=await MESSAGE.findByIdAndDelete(id)
        if(!messages){
            return errormessage(res,401,`message with id ${id} not deleted`)
        }
        else{
            return successmessage(res,200,`message successfuly deleted`)
        }

    }
    static async deleteallmessage(req,res){
        const messages=await MESSAGE.deleteMany()
        if(!messages){
            return errormessage(res,401,`message not deleted`)
        }
        else{
            return successmessage(res,200,`all message successfuly deleted`)
        }
    }

}
    export default messagecontroller