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
      thumbnail: "",
      name: " ",
      device_id:['']
    };
    const owner = await userModel.findById(res.locals.user._id);
    if (!owner)
      return res
        .status(400)
        .json({ msg: "User is not found", status: "0", media });

    const image = req.body.image;

    await cloudinary.v2.uploader
      .upload(image, { folder: "media" })
      .then(async (result) => {
        const newMedia = new mediaModel({
          media: result?.url,
          type: "image",
          thumbnail: " ",
          name: req.body.name,
        });
        owner.media_id.push(newMedia._id);
        await owner?.save();
        await newMedia.save();
        console.log(result);

        return res
          .status(201)
          .json({ msg: "Image Added", status: "1", media: newMedia });
      })
      .catch((err: Error) => {
        console.log(err);

        return res.status(400).json({
          msg: "Video adding Unsuccessful",
          status: "0",
          media: media,
        });
      });
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
      thumbnail: "",
      name: "",
      device_id:['']
    };
    const owner = await userModel.findById(res.locals.user._id);
    if (!owner)
      return res
        .status(400)
        .json({ msg: "User is not found", status: "0", media: media });

    const video = req.body.video;

    // Upload video to Cloudinary
    await cloudinary.v2.uploader

      .upload(video, {
        resource_type: "video",
        folder: "media",
      })
      .then(async (result) => {
        let thumbnail = result.url;
        const count = thumbnail.length - 3;
        thumbnail = thumbnail.substring(0, count);
        thumbnail = thumbnail + "jpg";
        console.log(thumbnail);
        const newMedia = new mediaModel({
          thumbnail: thumbnail,
          name: req.body.name,
          media: result.url,
          type: "video",
        });

        console.log(result);

        owner.media_id.push(newMedia._id);
        await owner?.save();
        await newMedia.save();

        res.status(201).json({ msg: "Video Added", status: "1", newMedia });
      })
      .catch((err) => {
        return res.status(400).json({
          msg: "Video adding Unsuccessful",
          status: "0",
          media: media,
        });
      });
  } catch (error) {
    next(error);
  }
};
