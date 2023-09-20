import express from "express";
import USER from "../model/user";
import errormessage from "../utils/errormessage";

class datacheck{
    static async userregisterempty(req,res,next){
        const{firstname,lastname,username,email,password}=req.body
        if(firstname==""){
            return errormessage(res,401,`please write your firstname properly`)
        }
        else if(lastname==""){
            return errormessage(res,401,`please write your lastname properly`)
        }
        else if(username==""){
            return errormessage(res,401,`please write your username properly`)
        }
        else if(email==""){
            return errormessage(res,401,`please write your email properi`)
        }
        else if(password==""){
            return errormessage(res,401,`please write your password properly`)
        }
        else{
            next()
        }
    }
    static async emailexist(req,res,next){
        const{email}=req.body
        const user=await USER.findOne({email})
            if(user){
                return errormessage(res,401,`user already exist`)
            }
            else{
                next()
            }
        }
    
}
export default datacheck
