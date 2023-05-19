import "dotenv/config";
import env from "../env";
import { RequestHandler } from "express";
import deviceModel from "../models/Device";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userModel from "../models/User";

interface addDevice {
  name: string;
  uid: string;
  owner_id: string;
}

export const addDevice: RequestHandler = async (req, res, next) => {
  try {
    const user = await userModel.findById(res.locals.user._id);
    if (!user) return res.status(400).json({ msg: "User is not found" });
    const { name, uid } = req.body;

    if (!name || !uid) {
      return res.status(400).json({ msg: "Please input all data" });
    }
    const device = new deviceModel({
      name: name,
      uid: uid,
      owner_id: user._id,
    });

    user.device_id.push(device._id);
    await user.save();

    const doc = await device.save();
    res.status(200).json({ device:doc, user });
  } catch (error) {
    next(error);
  }
};
