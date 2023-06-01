import express from "express";
import authMiddleware from "../middleware/isAuth";
import {
  addDevice,
  deleteDevices,
  getDevice,
  syncDevice,
  generateUid,
  checkChange,
  resyncDevice,
  addPlaylistToDevice,
  removePlaylistFromDevice,
  playPlaylist,
  interactive,
  checkInteractive,
} from "../controllers/Device";
const router = express.Router();

router.delete("/delete/:id", authMiddleware, deleteDevices);
router.delete("/remove_playlist/:did/:pid", removePlaylistFromDevice);

router.get("/sync/:uid", syncDevice);
router.get("/sync/update", authMiddleware ,resyncDevice);
router.get("/get/:id", getDevice);
router.get("/generate/uid", generateUid);
router.get("/check_change/:id", checkChange);
router.get("/check_interactive/:did", checkInteractive);



router.post("/add", authMiddleware, addDevice);
router.post("/play_playlist/:did/:pid",playPlaylist)
router.post("/add_playlist/:did/:pid",addPlaylistToDevice)
router.post("/interactive/:did/:mid", interactive);



router.get("/sync_update/:id" ,resyncDevice);



export default router;
