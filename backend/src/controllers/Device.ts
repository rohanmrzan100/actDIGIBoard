import "dotenv/config";
import env from "../env";
import { RequestHandler } from "express";
import deviceModel, { Device } from "../models/Device";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userModel, { User } from "../models/User";
import uidModel from "../models/UniqueID";
import playlistModel from "../models/Playlist";

interface addDevice {
  name: string;
  uid: string;
  owner_id: string;
}

export const addDevice: RequestHandler<unknown, unknown, addDevice> = async (
  req,
  res,
  next
) => {
  try {
    let device: Device = {
      _id: "",
      name: "",
      uid: "",
      owner_id: "",
      playlist: "",
      change: false,
    };
    const owner = await userModel.findById(res.locals.user._id);
    if (!owner)
      return res
        .status(400)
        .json({ msg: "User is not found", status: "0", device });
    const { name, uid } = req.body;

    if (!name || !uid) {
      return res
        .status(400)
        .json({ msg: "Please input all data", status: "0", device });
    }

    const checkuid = await uidModel.findOne({ uid: uid });
    if (!checkuid) {
      return res.status(400).json({ msg: "Invalid Code", status: "0", device });
    }
    const addedDevice = new deviceModel({
      name: name,
      uid: uid.toLocaleLowerCase(),
      owner_id: owner?._id,
      playlist:null
   
    });
 const doc = await addedDevice.save();
    owner.device_id.push(addedDevice._id);
    await owner?.save();

    res
      .status(200)
      .json({ device:doc, status: "1", msg: "Device added sucessfully." });
  } catch (error) {
    next(error);
  }
};

// @route      /api/device/delete/:id
// @desc       delete added devicess
// @auth       protected

export const deleteDevices: RequestHandler = async (req, res, next) => {
  try {
    const owner_id = res.locals.user._id
    const device_id = req.params.id;
    if (!mongoose.isValidObjectId(device_id)) {
      return res.status(400).json({ msg: "Invalid device ID", status: "0" });
    }
    const device = await deviceModel.findById(device_id);
    if (!device) {
      return res.status(400).json({ msg: "Device not found", status: "0" });
    }


    const owner = await userModel.findByIdAndUpdate(
      { _id: device.owner_id },
      { $pull: { device_id: device_id } }
    );

    await deviceModel.findByIdAndDelete(device_id);
    res.status(200).json({ msg: "Device is removed", status: "1" });
  } catch (error) {
    next(error);
  }
};

// // @route      /api/device/add_media/:id
// // @desc      add media URL in devices
// // @auth       protected

// export const addMedia: RequestHandler = async (req, res, next) => {
//   try {
//     let media = [""];
//     const array = req.body.array;
//     if (!array) {
//       return res
//         .status(400)
//         .json({ msg: "Please Provide Media to add", status: "0" });
//     }
//     const device_id = req.params.id;
//     if (!mongoose.isValidObjectId(device_id)) {
//       return res.status(400).json({ msg: "Invalid device ID", status: "0" });
//     }
//     const device = await deviceModel.findById(device_id);
//     if (!device) {
//       return res.status(400).json({ msg: "Device not found", status: "0" });
//     }
//     array.map(async(item: string) => {
//        if (!mongoose.isValidObjectId(item)) {
//       return res.status(400).json({ msg: "Invalid media ID", status: "0" });
//     }
    
      
//     });
//     device.change = true;
//     const doc = await device.save();
//     res.status(200).json({ msg: "Media added to device", status: "1" });
//   } catch (error) {
//     next(error);
//   }
// };

// // @route     /api/device/remove_media/:did/:mid
// // @desc      get devices
// // @auth      protected

// export const deleteMedia: RequestHandler = async (req, res, next) => {
//   try {
//     const media_id = req.params.mid;
//     const device_id = req.params.did;
//     if (!mongoose.isValidObjectId(media_id)) {
//       return res.status(400).json({ msg: "Invalid media ID", status: "0" });
//     }
//     const device = await deviceModel.findById(device_id);
//     if (!device) {
//       return res.status(400).json({ msg: "Device not found", status: "0" });
//     }

//     await deviceModel.findByIdAndUpdate(
//       { _id: device_id },
//       { $pull: { media: media_id } }

//     )
//     await mediaModel.findByIdAndUpdate(
//       { _id: media_id },
//       { $pull: { device_id: device_id } }
//     );
//     device.change = true;
//     await device.save();
//     res.status(200).json({ msg: "Media is deleted from device", status: "1" });
//   } catch (error) {
//     next(error);
//   }
// };

// @route     /api/device/:id
// @desc      get devices
// @auth      protected
export const getDevice: RequestHandler = async (req, res, next) => {
  let EmptyDevice = {
    _id: "",
    name: "",
    playlist: "",
  
  };
  try {
    const device_id = req.params.id;
    if (!mongoose.isValidObjectId(device_id)) {
      return res
        .status(400)
        .json({ msg: "Invalid device ID",device:EmptyDevice, status: "0" });
    }
    const device = await deviceModel.findById(device_id).select("playlist name _id");
    if(!device){
      return res
        .status(400)
        .json({ msg: "Invalid device ID",device:EmptyDevice, status: "0" });
    }
  

    res.status(200).json({msg:"Device Found",device,status:"1"})

  
  } catch (error) {
    next();
  }
};

// @route      /api/device/generateuid
// @desc        generate unique token and store in DB for SYNC
// @auth       public
// player
export const generateUid: RequestHandler = async (req, res, next) => {
  try {
    function uniqueid() {
      // always start with a letter (for DOM friendlyness)
      let idstr = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
      do {
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode = Math.floor(Math.random() * 42 + 48);
        if (ascicode < 58 || ascicode > 64) {
          // exclude all chars between : (58) and @ (64)
          idstr += String.fromCharCode(ascicode);
        }
      } while (idstr.length < 6);

      return idstr;
    }

    const code = uniqueid().toLocaleLowerCase();
    console.log(code);

    const uid = new uidModel({
      uid: code,
    });
    await uid.save();
    res.status(200).json({ msg: "uid generated and stored in DB", uid: uid });
  } catch (error) {
    next();
  }
};

//player
export const syncDevice: RequestHandler = async (req, res, next) => {
  try {
    const uid = req.params.uid;

    let device = await deviceModel.findOne({ uid: uid });
    if (!device) {
      const device: Device = {
        _id: "",
        name: "",
        uid: "",
        owner_id: "",
        change: false,
        playlist: "",
      };
      return res
        .status(400)
        .json({ status: "0",device, msg: "Device not found" , token: " "});
    }
    const token = jwt.sign({ _id: device.owner_id }, env.SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({
      status: "1",
      device,
      token: token,
      msg: "Device verified.",
    });
  } catch (error) {
    next(error);
  }
};



// @route      /api/device/update_sync/:id
// @desc       resync device from website
// @auth       private

export const resyncDevice: RequestHandler = async (req, res, next) => {
  try {

    const device_id = req.params.id;
    if (!mongoose.isValidObjectId(device_id)) {
      return res.status(400).json({ msg: "Invalid device ID", status: "0" });
    }

    const device = await deviceModel.findById(device_id);
    if (!device) {
      return res.status(400).json({ msg: "Device not found", status: "0" });
    }


    device.change = true;
    await device.save();

    res.status(200).json({ msg: "Device is resynced", status: "1" });
  } catch (error) {
    next(error);
  }
};







// @route      /api/device/check_change/:id
// @desc       check for change in device media
// @auth       public
// player

export const checkChange: RequestHandler = async (req, res, next) => {
  try {
    const device_id = req.params.id;

    const device = await deviceModel.findById(device_id);
    if (!device) {
      return res.status(400).json({ msg: "Device not found", status: "0" });
    }

    if (!device.change) {
      return res
        .status(200)
        .json({ msg: "Device media is not changed", status: "0" });
    } else {
      device.change = false;
      await device.save();
      return res
        .status(200)
        .json({ msg: "Device media is changed.", status: "1" });
    }
  } catch (error) {
    next();
  }
};

// @route      /api/device/add_playlist/:did/:pid
// @desc       resync device from website
// @auth       private

export const addPlaylistToDevice: RequestHandler = async (req, res, next) => {
  try {
   const device_id = req.params.did
   const playlist_id = req.params.pid

   if (!mongoose.isValidObjectId(device_id) || !mongoose.isValidObjectId(playlist_id) )  {
    return res
      .status(400)
      .json({ msg: "Invalid  ID", status: "0" });
  }

  const device = await deviceModel.findById(device_id)
  if(!device){
    return res.status(400).json({msg:"Device not found",status:"0"})
  }
  const playlist = await playlistModel.findById(playlist_id)
  if(!playlist){
    return res.status(400).json({msg:"Playlist not found",status:"0"})
  }
  playlist.device.push(device_id)
  device.playlist = playlist_id

  await playlist.save()
  await device.save()

  res.status(200).json({msg:"Playlist added to device",status:"1"})
  } catch (error) {
    next(error);
  }
};


