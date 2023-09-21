import productcontroller from "../controller/productcontroller";
import  express from "express";
import verifyaccess from "../middlewares/verifyaccess";


const router=express.Router()
 
router.post("/",productcontroller.createproduct)
router.get("/:id",productcontroller.getoneproduct)
router.get("/",productcontroller.getallproduct)
router.delete("/:id",productcontroller.deleteoneproduct)
router.delete("/",productcontroller.deleteallproduct)
router.patch("/:id",productcontroller.updateproduct)
router.put("/like/:id",verifyaccess("user"),productcontroller.createlikes)
router.put("/dislike/:id",productcontroller.createdislikes)


export default router