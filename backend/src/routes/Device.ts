import express from "express";
import authMiddleware from "../middleware/isAuth";
import {
  addDevice,
  addMedia,
  deleteDevices,
  getDevice,
  syncDevice,
  deleteMedia,
  generateUid,
  checkChange,
  createPlaylist,
  resyncDevice,
} from "../controllers/Device";
const router = express.Router();

router.post("/add", authMiddleware, addDevice);
router.delete("/delete/:id", authMiddleware, deleteDevices);
router.delete("/remove_media/:did/:mid", authMiddleware, deleteMedia);
router.post("/add_media/:id", authMiddleware, addMedia);
router.get("/sync/:uid", syncDevice);

router.get("/sync/update", authMiddleware ,resyncDevice);
router.get("/get/:id", getDevice);
router.get("/generate/uid", generateUid);
router.get("/check_change/:id", checkChange);
router.get("create_playlist/:id", createPlaylist);



router.get("/sync_update/:id" ,resyncDevice);



export default router;
