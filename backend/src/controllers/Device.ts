import "dotenv/config";
import env from "../env";
import { RequestHandler } from "express";
import deviceModel, { Device } from "../models/Device";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userModel, { User } from "../models/User";

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
    const addedDevice = new deviceModel({
      name: name,
      uid: uid,
      owner_id: owner?._id,
    });

    owner.device_id.push(addedDevice._id);
    await owner?.save();

    const doc = await addedDevice.save();

    device = <Device>await deviceModel.findById(doc._id);
    // .populate("owner_id");
    res
      .status(200)
      .json({ device, status: "1", msg: "Device added sucessfully." });
  } catch (error) {
    next(error);
  }
};

export const syncDevice: RequestHandler = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    let foundDevice = await deviceModel.findOne({ uid: uid });
    if (!foundDevice) {
      const device: Device = {
        _id: "",
        name: "",
        uid: "",
        owner_id: "",
      };
      return res
        .status(400)
        .json({ status: "0", device, token: " ", msg: " " });
    }
    const token = jwt.sign(
      { uid: uid, owner_id: foundDevice.owner_id },
      env.SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.status(200).json({
      status: "1",
      device: foundDevice,
      token: token,
      msg: "Device verified.",
    });
  } catch (error) {
    next(error);
  }
};

// @route      /api/device/delete/:id
// @desc       delete added devicess
// @auth       protected

export const deleteDevices: RequestHandler = async (req, res, next) => {
  try {
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
