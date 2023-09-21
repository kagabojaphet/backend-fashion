import  express from "express";
import messagecontroller from "../controller/messagecontroller";
import verifyaccess from "../middlewares/verifyaccess";


const router=express.Router()

router.post("/",verifyaccess("user"),messagecontroller.createmessage)
router.get("/:id",verifyaccess("admin"),messagecontroller.getonemessage)
router.get("/",verifyaccess("admin"),messagecontroller.getallmessage)
router.delete("/:id",verifyaccess("admin"),messagecontroller.deleteonemessage)
router.delete("/",verifyaccess("admin"),messagecontroller.deleteallmessage)

export default router