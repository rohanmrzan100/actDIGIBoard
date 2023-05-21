import express from "express";
import authMiddleware from "../middleware/isAuth";
import {
  addDevice,
  addMedia,
  deleteDevices,
  getDevice,
  syncDevice,
//   deleteMedia,
} from "../controllers/Device";
const router = express.Router();




router.post("/add",authMiddleware,addDevice)
router.delete("/delete/:id", authMiddleware, deleteDevices);
// router.delete("/delete_media/:id", authMiddleware, deleteMedia);
router.post("/add_media/:id", authMiddleware, addMedia);
router.get("/sync/:uid",syncDevice)
router.get("/:id", getDevice);

export default router;
