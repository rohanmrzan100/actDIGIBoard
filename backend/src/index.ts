import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import env from "./env";
const path = require("path");
import userRouter from "./routes/User";
import deviceRouter from "./routes/Device";
import playlistRouter from "./routes/Playlist";
import router from "./routes/Uploads";
const app = express();
app.use(express.static(path.join(__dirname, "../public/assets")));
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("hello world")
});
app.use("/api/user", userRouter);
app.use("/api/device", deviceRouter);
app.use("/api/playlist", playlistRouter);
app.use("/api/media", router);

app.use((req: any, res: any, next: NextFunction) => {
  next(Error("Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An error in server has occured";
  if (error instanceof Error) errorMessage = error.message;
  console.log(error);
  res.status(500).json({ msg: errorMessage, status: "0" });
});
// env.MONGO_URI;
mongoose
  // .connect("mongodb://0.0.0.0:27017/act")
  .connect(env.MONGO_URI)
  .then(() => {
    const port = env.PORT;
    app.listen(3001, () => {
      console.log(`APP is running on port ${env.PORT}`);
    });
    console.log("connected to DB");
  })
  .catch((err: Error) => console.log(err));
