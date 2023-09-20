import  express from "express";
import userroutes from "./userroutes"
import productroutes from "./productroutes"
import commentroutes from "./commentroutes"
import messageroutes from "./messageroutes"

const router=express.Router()

router.use("/user",userroutes)
router.use("/product",productroutes)
router.use("/comment",commentroutes)
router.use("/message",messageroutes)

export default router