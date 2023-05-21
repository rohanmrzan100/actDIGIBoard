import mongoose from "mongoose";

export interface User {
  _id?: string;
  email: string;
  name: string;
  password: string;
  device_id: [string];
  media_id: [string];
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  device_id: [{ type: mongoose.Types.ObjectId, ref: "device" }],
  media_id: [{ type: mongoose.Types.ObjectId, ref: "media" }],
},{
  timestamps:true
});

const userModel = mongoose.model<User>("user", userSchema);
export default userModel;
