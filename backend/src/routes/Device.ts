import express from "express";
import authMiddleware from "../middleware/isAuth";
import { addDevice, syncDevice } from "../controllers/Device";
const router = express.Router();




router.post("/add",authMiddleware,addDevice)
router.get("/sync/:uid",syncDevice)

export default router;
