import { Router } from "express";
import {
  createPlaylist,
  deleteMedia,
  deletePlaylistByID,
  getPlaylistById,
} from "../controllers/Playlist";
import authMiddleware from "../middleware/isAuth";
const router = Router();

router.post("/create", authMiddleware, createPlaylist);
router.get("/get/:id", authMiddleware, getPlaylistById);
router.delete("/delete/:id", authMiddleware, deletePlaylistByID);
router.delete("/media_delete/:pid/:mid", authMiddleware, deleteMedia);

export default router;
