import express from "express";
import authMiddleware from "../middleware/isAuth";
import { addDevice, addMedia, deleteDevices, syncDevice } from "../controllers/Device";
const router = express.Router();




router.post("/add",authMiddleware,addDevice)
router.delete("/delete/:id", authMiddleware, deleteDevices);
router.post("/add_media/:id", authMiddleware, addMedia);
router.get("/sync/:uid",syncDevice)

export default router;
