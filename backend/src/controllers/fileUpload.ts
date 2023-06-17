import { RequestHandler } from "express";
import mediaModel from "../models/Media";
import userModel from "../models/User";
import Ffmpeg from "fluent-ffmpeg";
const path = require("path");
const fs = require("fs");

class userController {
  static fileUpload: RequestHandler = async (req, res, next) => {
    console.log(req.file);

    try {
      const owner = await userModel.findById(res.locals.user._id);
      if (!owner)
        return res.status(400).json({ msg: "User is not found", status: "0" });
      if (!req.file) {
        return res.status(400).json({ msg: "File not found", status: "0" });
      }

      const media = new mediaModel({
        name: req.file.originalname,
        type: req.file.mimetype.substring(0, 5),
        media: "compressed" + req.file.filename,
        // media: req.file.filename,
      });
      owner.media_id.push(media._id);

      const inputFilePath = path.join(
        __dirname + "../../../public/assets/" + req.file.filename
      );
      const outputFilePath = path.join(
        __dirname + "../../../public/assets/compressed" + req.file.filename
      );
      await owner.save();
      await media.save();
      await new Promise((resolve, reject) => {
        Ffmpeg(inputFilePath)
          // Generate 720P video
          .output(outputFilePath)
          .videoCodec("libx264")
          .size("1280x720")

          .on("progress", function (progress) {
            console.log("... frames: " + progress.frames);
          })

          .on("end", () => resolve("resolved"))
          .on("error", (error: any) => reject(new Error(error.message)))
          .run();
      }).then(() => {
        fs.unlinkSync(
          path.join(
            __dirname + "../../../public/assets/" + media.media.slice(10)
          )
        );
      });

      res.status(200).json({ msg: "Media Uploaded", status: "1" });
    } catch (error) {
      next(error);
    }
  };
}

export default userController;
