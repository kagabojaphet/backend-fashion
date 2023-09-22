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
router.get("/",verifyaccess("admin"),usercontroller.getalluser)
router.get("/:id",verifyaccess("admin"),usercontroller.getoneuser)
router.delete("/:id",verifyaccess("admin"),usercontroller.deleteoneuser)
router.delete("/",verifyaccess("admin"),usercontroller.deletealluser)
router.patch("/:id",verifyaccess("admin"),usercontroller.updateuser)
router.post("/login",usercontroller.loginuser)

export default router