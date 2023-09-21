import express  from "express";
import commentcontroller from "../controller/commentcontroller";
import verifyaccess from "../middlewares/verifyaccess";


const router=express.Router()

router.post("/:id",verifyaccess("user"),commentcontroller.createcomment)
router.get("/",commentcontroller.getallcomment)
router.get("/:id",commentcontroller.getonecomment)
router.delete("/:id",commentcontroller.deleteonecomment)
router.delete("/",commentcontroller.deleteallcomment)

export default router