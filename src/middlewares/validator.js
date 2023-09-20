import { check,validationResult } from "express-validator";
import errormessage from "../utils/errormessage";


class validator{
    static  inputvalidator(req,res,next){
        const error=validationResult(req)
        if(!error==error.isEmpty()){
            error.errors.map((err)=>{
                errormessage(res,401,err.msg)
            })
        }
        else{
            return next()
        }
    }
    static  useraccountrule(){
        return[
            check("firstname","please write your firstname correctly").trim().isAlpha(),
            check("lastname","please write your lastname correctly").trim().isAlpha(),
            check("username","please write your username correctly").trim().isAlpha(),
            check("email","please write your email correctly").trim().isEmail(),
            check("password","please write your password correctly").trim().isStrongPassword()
        ] 
    }
}
export default validator