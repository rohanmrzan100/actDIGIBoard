import express from "express";
import authMiddleware from "../middleware/isAuth";
import { addDevice, deleteDevices, syncDevice } from "../controllers/Device";
const router = express.Router();




router.post("/add",authMiddleware,addDevice)
router.delete("/delete/:id", authMiddleware, deleteDevices);
router.get("/sync/:uid",syncDevice)

export default router;
