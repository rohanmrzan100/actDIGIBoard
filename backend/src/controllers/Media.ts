import cloudinary from "../utils/cloudinary";
import mediaModel, { Media } from "../models/Media";
import { RequestHandler } from "express";
import userModel from "../models/User";

export const uploadImage: RequestHandler = async (req, res, next) => {
  try {
    let media: Media = {
      _id: "",
      media: "",
      type: "",
    };
    const owner = await userModel.findById(res.locals.user._id);
    if (!owner)
      return res
        .status(400)
        .json({ msg: "User is not found", status: "0", media });

    const fileString = req.body.image;

    const result = await cloudinary.v2.uploader
      .upload(fileString, { folder: "media" })
      //   .then((res) => console.log(res))
      .catch((err: Error) => console.log(err));
    const newMedia = new mediaModel({
      media: result?.url,
      type: "image",
    });
    owner.media_id.push(newMedia._id);
    await owner?.save();
    await newMedia.save();
console.log(result);

    res.status(201).json({ msg: "Image Added", status: "1", newMedia });
  } catch (error) {
    next(error);
  }
};
export const uploadVideo: RequestHandler = async (req, res, next) => {
  try {
    let media: Media = {
      _id: "",
      media: "",
      type: "",
    };
    const owner = await userModel.findById(res.locals.user._id);
    if (!owner)
      return res
        .status(400)
        .json({ msg: "User is not found", status: "0", media:media });

    const videoString = req.body.video;

    // Upload video to Cloudinary
    const result = await cloudinary.v2.uploader
      .upload(videoString, {
        resource_type: "video",
      })
      .catch((err) =>
        console.log({ msg: "Video adding Unsuccessful", status: "0", media:media })
      );
    const newMedia = new mediaModel({
      media: result?.url,
      type: "video",
    });
    console.log(result?.url);
    
    owner.media_id.push(newMedia._id);
    await owner?.save();
    await newMedia.save();

    res.status(201).json({ msg: "Video Added", status: "1", newMedia });
  } catch (error) {
    next(error);
  }
};
