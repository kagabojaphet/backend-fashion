import express  from "express";
import commentcontroller from "../controller/commentcontroller";
import verifyaccess from "../middlewares/verifyaccess";


const router=express.Router()

router.post("/:id",commentcontroller.createcomment)
router.get("/",commentcontroller.getallcomment)
router.get("/:id",commentcontroller.getonecomment)
router.delete("/:id",commentcontroller.deleteonecomment)

export default router