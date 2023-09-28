import USER from "../model/user";
import bcrypt from"bcrypt";
import errormessage from "../utils/errormessage";
import successmessage from "../utils/successmessage";
import Jwt  from "jsonwebtoken";
import welcomeEmail from "../utils/welcomeEmail";

class usercontroller{
    static async createuser(req,res){
        const{firstname,lastname,username,email,role,password,confrimpassword}=req.body
        try {
            if(req.body.password!==req.body.confirmpassword){
                return errormessage(res,401,`password and confirmpassword not match`)
            } 
            const hashpassword= bcrypt.hashSync(req.body.password,10)
            const user=await USER.create({firstname,lastname,username,email,role,password:hashpassword})
      
            welcomeEmail(user)
            return successmessage(res,201,`user created`,user)

         
        } catch (error) {
            return errormessage(res,500,`error ${error}`)
        }
        
    }
    static async getalluser(req,res){
        const user=await USER.find()
        try {
            if(!user){
                return errormessage(res,401,`user not found`)
            }
            else{
                return successmessage(res,201,`user successfuly ${user.length} retrieved`,user)
            }
        } catch (error) {
            return errormessage(res,404,`error ${error}`)
        }
    }
    static async getoneuser(req,res){
        const id=req.params.id
        const user=await USER.findById(id)
        try {
            if(!user){
                return errormessage(res,401,`user not found`)
            }
            else{
                return successmessage(res,200,`user successfuly retrieved`,user)
            }
        } catch (error) {
            return errormessage(res,404,`error ${error}`)
        }
    }
    static async deleteoneuser(req,res){
        const id=req.params.id
        const user=await USER.findByIdAndDelete(id)
        try {
            if(!user){
                return errormessage(res,401,`user not delete`)
            }
            else{
                return successmessage(res,200,`user successfuly deleted`)
            }
        } catch (error) {
            return errormessage(res,404,`error ${error}`)
        }
    }
    static async deletealluser(req,res){
        const user=await USER.deleteMany()
        try {
            if(!user){
                return errormessage(res,401,`user not delete`)
            }
            else{
                return successmessage(res,200,`all user successfuly deleted`)
            }
        } catch (error) {
            return errormessage(res,404,`error ${error}`)
        }
    }
    static async updateuser(req,res){
        const id=req.params.id
        const user=await USER.findByIdAndUpdate(id,req.body,{new:true})
        try {
            if(!user){
                return errormessage(res,401,`user not updated`)
            }
            else{
                return successmessage(res,201,`user successfuly updated`,user)
            }
        } catch (error) {
            return errormessage(res,404,`error ${error}`)
        }
    }
    static async loginuser(req,res){
        const { username, email, password } = req.body;
        const user = await USER.findOne({
            $or: [{username}, {email}],
          });
          console.log(user)
        try {
            if(!user){
                return errormessage(res,401,`incorrect username and email`)
            }
            // const passwordmatch = await bcrypt.compare(password,user.password)
            else{
                const token=Jwt.sign({user:user},process.env.SCRET_KEY,{expiresIn:"1d"})

                res.status(200).json({
                    token:token,
                    data:{
                        firstname:user.firstname,
                        lastname:user.lastname,
                        username:user.username,
                        email:user.email,
                        password:user.password,
                        role:user.role
                    }
                })
            }
        } catch (error) {
            return errormessage(res,404,`error ${error}`)
        }
    
}}
export default usercontroller