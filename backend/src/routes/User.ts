import express from "express";
import authMiddleware from "../middleware/isAuth";
import { register, login, temp, getAllUser } from "../controllers/User";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/protected", authMiddleware, temp);
router.get("/", getAllUser);
router.get("/test", (req,res)=>{
    res.send("Hello WOrld")
});

export default router;
