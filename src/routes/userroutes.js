import exepress from "express"
import usercontroller from "../controller/usercontroller"
import datacheck from "../middlewares/datacheck"
import validator from "../middlewares/validator"
import verifyaccess from "../middlewares/verifyaccess"


const router=exepress.Router()


router.post("/",
datacheck.userregisterempty,
datacheck.emailexist,
validator.useraccountrule(),
validator.inputvalidator,
usercontroller.createuser)
router.get("/",verifyaccess,usercontroller.getalluser)
router.get("/:id",usercontroller.getoneuser)
router.delete("/:id",usercontroller.deleteoneuser)
router.delete("/",usercontroller.deletealluser)
router.patch("/:id",usercontroller.updateuser)
router.post("/login",usercontroller.loginuser)

export default router