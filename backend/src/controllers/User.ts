import "dotenv/config";
import env from "../env";
import { RequestHandler } from "express";
import userModel from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/User";

let doc: User = {
  _id: "",
  email: "",
  name: "",
  password: "",
  device_id: [""],
};

export const temp: RequestHandler = async (req, res, next) => {
  const userID = res.locals.user._id;
  if (!mongoose.isValidObjectId(userID)) {
    return res.status(400).json({ msg: "Invalid user ID" });
  }
  const user = await userModel.findById(userID);
  res.status(200).json(user);
};

interface registerBody {
  name?: string;
  email?: string;
  password?: string;
}

export const register: RequestHandler<
  unknown,
  unknown,
  registerBody,
  unknown
> = async (req, res, next) => {
  let doc: User = {
    _id: "",
    email: "",
    name: "",
    password: "",
    device_id: [""],
  };

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "Please provide all required data",
        status: "0",
        doc,
      });
    }
    const checkUser = await userModel.findOne({ email: email });
    if (checkUser)
      return res
        .status(400)
        .json({ msg: "Email is already taken.", status: "0", doc });

    const salt = bcrypt.genSaltSync(10);
    const Hashpassword = bcrypt.hashSync(password, salt);

    const user = new userModel({
      name: name,
      email: email,
      password: Hashpassword,
    });

    doc = await user.save();

    res.status(201).json({ doc, status: "1", msg: "Register success" });
  } catch (error) {
    next(error);
  }
};

interface loginBody {
  email: string;
  password: string;
}
export const login: RequestHandler<unknown, unknown, loginBody> = async (
  req,
  res,
  next
) => {


  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide all required data", status: "0" });
    }
    const user = await userModel.findOne({ email: email });
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: "Password is incorrect", status: "0" });
      }
      const token = jwt.sign({ _id: user._id, name: user.name }, env.SECRET, {
        expiresIn: "30d",
      });
      return res
        .status(200)
        .json({ msg: "Login Successful", token: token, status: "1" ,doc:user});
    }
    res.status(400).json({ msg: "Email not found.", status: "0" ,doc});
  } catch (error) {
    next(error);
  }
};

export const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await userModel.find();
    res.status(400).json({ user, status: "1" });
  } catch (error) {
    next(error);
  }
};
