import productcontroller from "../controller/productcontroller";
import  express from "express";


const router=express.Router()
 
router.post("/",productcontroller.createproduct)
router.get("/:id",productcontroller.getoneproduct)
router.get("/",productcontroller.getallproduct)
router.delete("/:id",productcontroller.deleteoneproduct)
router.delete("/",productcontroller.deleteallproduct)
router.patch("/:id",productcontroller.updateproduct)


export default router