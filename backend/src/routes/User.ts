import express from "express";
import authMiddleware from "../middleware/isAuth";
import {
  register,
  login,
  getUserData,
  getAllUser,
  viewAllDevices,
  deleteMedia,
} from "../controllers/User";
import { uploadImage, uploadVideo } from "../controllers/Media";
import { createPlaylist } from "../controllers/Playlist";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/add_image", authMiddleware, uploadImage);
router.post("/add_video", authMiddleware, uploadVideo);


router.get("/all", getAllUser);
router.get("/content", authMiddleware, getUserData);
router.get("/view_devices", authMiddleware, viewAllDevices);
router.delete("/delete_media/:id", authMiddleware, deleteMedia);

router.post("/create/playlist",authMiddleware,createPlaylist)


//test
router.get("/test", (req,res)=>{
    res.send("Hello WOrld")
});

export default router;
