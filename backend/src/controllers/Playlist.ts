// @route      /api/playlist/create/
// @desc       check for change in device media
// @auth       public

import { RequestHandler } from "express";
import mongoose from "mongoose";
import userModel from "../models/User";
import playlistModel, { Playlist } from "../models/Playlist";
import mediaModel from "../models/Media";
import deviceModel from "../models/Device";

export const createPlaylist: RequestHandler = async (req, res, next) => {
  try {
    const array: [string] = req.body.array;
    const name = req.body.name;
    if (!array || !name) {
      return res
        .status(400)
        .json({ msg: "Please Provide all data ", status: "0" });
    }
    const userID = res.locals.user._id;
    if (!mongoose.isValidObjectId(userID)) {
      return res.status(400).json({ msg: "Invalid user ID", status: "0" });
    }
    const user = await userModel.findById(userID);
    if (!user) {
      return res.status(400).json({ msg: "Cannot find user", status: "0" });
    }

    const playlist = new playlistModel({
      name: name,
      media: array,
    });


    playlist.media.forEach(async(media_id)=>{
      const media = await mediaModel.findById(media_id)
      media?.playlist_id.push(playlist._id)
      await media?.save()
    })

    user.playlist.push(playlist._id);
    await playlist.save();
    await user.save();

    res
      .status(200)
      .json({ msg: "Playlist is created.", status: "1" });
  } catch (error) {
    next();
  }
};

// @route      /api/playlist/get/:id
// @desc       check for change in device media
// @auth       public

export const getPlaylistById: RequestHandler = async (req, res, next) => {
  try {
    let playlist: Playlist = {
      _id: "",
      name: "",
      media: [""],
      device: [""],
    };
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ msg: "Invalid playlist id", status: "0", playlist });
    }
    const foundPlaylist = await playlistModel.findById(id).populate("media");
    if (!foundPlaylist) {
      return res
        .status(400)
        .json({ msg: "Playlist not found", playlist, status: "0" });
    }
    res
      .status(200)
      .json({ msg: "Playlist Found.", status: "1", foundPlaylist });
  } catch (error) {
    next();
  }
};

// @route      /api/playlist/delete/:id
// @desc       check for change in device media
// @auth       public

export const deletePlaylistByID: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msg: "Invalid playlist id", status: "0" });
    }
     const playlistFound = await playlistModel.findByIdAndDelete(id);
      if (!playlistFound) {
      return res.status(400).json({ msg: "Playlist not found" });
    }
   playlistFound.device.forEach(async(device_id)=>{
      await deviceModel.updateOne({_id:device_id},{$unset: {media: 1 }})
      const device = await deviceModel.findById(device_id)
      if (  device) {
        device.change = true
        await device?.save()
    }
      
       await deviceModel.findByIdAndUpdate(
       { _id: device?._id },
       { $pull: { playlist: id } }
     );
    })
   
   

    await userModel.findByIdAndUpdate(
      { _id: res.locals.user._id },
      { $pull: { playlist: id } }
    );

    await mediaModel.findByIdAndUpdate(
      { _id: res.locals.user._id },
      { $pull: { playlist: id } }
    );
     const playlist = await playlistModel.findByIdAndDelete(id);
    if (!playlist) {
      return res.status(400).json({ msg: "Playlist not found" });
    }
    res.status(200).json({ msg: "Playlist Deleted.", status: "1" });
  } catch (error) {
    next();
  }
};

// @route      /api/playlist/media_delete/:pid/:mid
// @desc       check for change in device media
// @auth       public

export const deleteMedia: RequestHandler = async (req, res, next) => {
  try {
    const media_id = req.params.mid;
    const playlist_id = req.params.pid;
    if (
      !mongoose.isValidObjectId(media_id) ||
      !mongoose.isValidObjectId(playlist_id)
    ) {
      return res.status(400).json({ msg: "Invalid  id", status: "0" });
    }

    
    let playlist = await playlistModel.findById(playlist_id);
    if (!playlist) {
      return res.status(400).json({ msg: "Playlist not found", status: "0" });
    }


    
    const media = await mediaModel.findById(media_id);
    if (!media) {
      return res.status(400).json({ msg: "Media not found", status: "0" });
    }
   
   await playlistModel.findByIdAndUpdate(
       { _id: playlist_id },
       { $pull: { media: media_id } }
     );
   
  playlist = await playlistModel.findById(playlist_id);
 if(!playlist)
 {
      return res.status(400).json({ msg: "Playlist is null", status: "0" });
 }
    await mediaModel.findByIdAndUpdate(
       { _id: media_id },
       { $pull: { playlist_id: playlist_id } }
     );
   
 
    playlist.device.forEach(async(device_id)=>{
        await deviceModel.updateOne({_id:device_id},{$unset: {media: 1 }})
        const device = await deviceModel.findById(device_id)
        if(device){
          device.change = true;
          playlist?.media.forEach((media_id)=>{
            device.media.push(media_id)
          })
          await device.save()
        }
        
    })




 
    res.status(200).json({ msg: "Media deleted from playlist Successfully", status: "1" });
  } catch (error) {
    next(error);
  }
};
// @route      /api/playlist/add_media/:pid
// @desc       check for change in device media
// @auth       public

export const addMedia: RequestHandler = async (req, res, next) => {
  try {
    const array = req.body.array
    const playlist_id = req.params.pid;
    if (!mongoose.isValidObjectId(playlist_id)) {
      return res.status(400).json({ msg: "Invalid  id", status: "0" });
    }

    const playlist = await playlistModel.findById(playlist_id);
    if (!playlist) {
      return res.status(400).json({ msg: "Playlist not found", status: "0" });
    }
    array.forEach(async(media_id :string) => {
      playlist.media.push(media_id)
      const media = await mediaModel.findById(media_id)
       if (!media) {
      return console.log("Media not found");
      
    }
    media.playlist_id.push(playlist._id);
    await media.save()
    });
    await playlist.save()
 
playlist.device.forEach(async(device_id)=>{
  const device = await deviceModel.findById(device_id)
  await deviceModel.updateOne({_id:device_id},{$unset: {media: 1 }})
  if(device){

    playlist.media.forEach((media_id)=>{
      device.media.push(media_id)
    })



    device.change = true
   await device.save()
  }
})

    console.log(playlist);
    

    res.status(200).json({ msg: "Media added to playlist Successfully", status: "1" });
  } catch (error) {
    next(error);
  }
};



