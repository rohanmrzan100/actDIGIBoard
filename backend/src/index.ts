import express, { Request, Response, NextFunction } from "express";
import "dotenv/config"
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import env from "./env";

import userRouter from "./routes/User"
import deviceRouter from "./routes/Device"
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.use("/api/user",userRouter)
app.use("/api/device", deviceRouter);

app.use((req: any, res: any, next: NextFunction) => {
  next(Error("Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An error in server has occured";
  if (error instanceof Error) errorMessage = error.message;
  console.log(error);
  res.status(500).json({ error: errorMessage });
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

export default app;
