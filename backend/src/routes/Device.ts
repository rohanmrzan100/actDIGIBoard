import express from "express";
import authMiddleware from "../middleware/isAuth";
import { addDevice } from "../controllers/Device";
const router = express.Router();




router.post("/add",authMiddleware,addDevice)
router.get("/add",authMiddleware,(req,res)=>{
    res.send("Working")
})

export default router;
