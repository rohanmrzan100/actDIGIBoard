import express from "express";
import authMiddleware from "../middleware/isAuth";
import {
  addDevice,
  // addMedia, 
  deleteDevices,
  getDevice,
  syncDevice,
  // deleteMedia,
  generateUid,
  checkChange,
  resyncDevice,
  addPlaylistToDevice,
  removePlaylistFromDevice,
  playPlaylist,
} from "../controllers/Device";
const router = express.Router();

router.post("/add", authMiddleware, addDevice);
router.delete("/delete/:id", authMiddleware, deleteDevices);
// router.delete("/remove_media/:did/:mid", authMiddleware, deleteMedia);
// router.post("/add_media/:id", authMiddleware, addMedia);
router.get("/sync/:uid", syncDevice);
router.get("/sync/update", authMiddleware ,resyncDevice);
router.get("/get/:id", getDevice);
router.get("/generate/uid", generateUid);
router.get("/check_change/:id", checkChange);

router.post("/play_playlist/:did/:pid",playPlaylist)
router.post("/add_playlist/:did/:pid",addPlaylistToDevice)
router.delete("/remove_playlist/:did/:pid",removePlaylistFromDevice)



router.get("/sync_update/:id" ,resyncDevice);



export default router;
