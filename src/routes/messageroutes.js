import  express from "express";
import messagecontroller from "../controller/messagecontroller";
import verifyaccess from "../middlewares/verifyaccess";


const router=express.Router()

router.post("/",verifyaccess("user"),messagecontroller.createmessage)
router.get("/:id",messagecontroller.getonemessage)
router.get("/",messagecontroller.getallmessage)
router.delete("/:id",messagecontroller.deleteonemessage)
router.delete("/",messagecontroller.deleteallmessage)

export default router