import productcontroller from "../controller/productcontroller";
import  express from "express";
import verifyaccess from "../middlewares/verifyaccess";


const router=express.Router()
 
router.post("/",productcontroller.createproduct)
router.get("/:id",productcontroller.getoneproduct)
router.get("/",productcontroller.getallproduct)
router.delete("/:id",verifyaccess("admin"),productcontroller.deleteoneproduct)
router.delete("/",verifyaccess("admin"),productcontroller.deleteallproduct)
router.patch("/:id",verifyaccess("admin"),productcontroller.updateproduct)
router.put("/like/:id",verifyaccess("user"),productcontroller.createlikes)
router.put("/dislike/:id",verifyaccess("user"),productcontroller.createdislikes)


export default router