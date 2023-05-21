import express from "express";
import authMiddleware from "../middleware/isAuth";
import {
  register,
  login,
  getUserData,
  getAllUser,
  viewAllDevices,
} from "../controllers/User";
import { uploadImage, uploadVideo } from "../controllers/Media";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/add_image", authMiddleware, uploadImage);
router.post("/add_video", authMiddleware, uploadVideo);



router.get("/", authMiddleware, getUserData);
router.get("/view_devices", authMiddleware, viewAllDevices);
router.get("/all", getAllUser);




//test
router.get("/test", (req,res)=>{
    res.send("Hello WOrld")
});

export default router;
