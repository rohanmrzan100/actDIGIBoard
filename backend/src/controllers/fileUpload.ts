import { RequestHandler } from "express";
import uploadModel from "../models/Uploads";
import mediaModel from "../models/Media";
import userModel from "../models/User";

class userController {
  static fileUpload: RequestHandler = async (req, res, next) => {
    //    console.log(req.file?.originalname);
    console.log(req.file);

    try {
      const owner = await userModel.findById(res.locals.user._id);
      if (!owner)
        return res
          .status(400)
          .json({ msg: "User is not found", status: "0" });
      if (!req.file) {
        return res.status(400).json({ msg: "File not found", status: "0" });
      }

      const media = new mediaModel({
        name: req.file.originalname,
        type: req.file.mimetype.substring(0, 5),
        media: req.file.filename,
      });
      owner.media_id.push(media._id);
      await owner.save();
      await media.save();
      res.status(200).json({ msg: "Media Uploaded", status: "1" });
    } catch (error) {
      next(error);
    }
  };
}

export default userController;
