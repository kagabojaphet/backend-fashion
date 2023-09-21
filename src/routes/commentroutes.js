import express  from "express";
import commentcontroller from "../controller/commentcontroller";
import verifyaccess from "../middlewares/verifyaccess";


const router=express.Router()

router.post("/:id",verifyaccess("user"),commentcontroller.createcomment)
router.get("/",verifyaccess("admin"),commentcontroller.getallcomment)
router.get("/:id",verifyaccess("admin"),commentcontroller.getonecomment)
router.delete("/:id",verifyaccess("admin"),commentcontroller.deleteonecomment)
router.delete("/",verifyaccess("admin"),commentcontroller.deleteallcomment)

export default router