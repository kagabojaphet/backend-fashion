import express  from "express";
import paymentcontroller from "../controller/paymentcontroller";
import verifyaccess from "../middlewares/verifyaccess";


const router=express.Router()

router.post("/:_id",verifyaccess("user"),paymentcontroller.createpayment)
router.get("/",paymentcontroller.getallpayment)
router.delete("/",paymentcontroller.deleteallpayment)

export default router