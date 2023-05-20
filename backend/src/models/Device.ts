import mongoose from "mongoose";

interface Device {
  _id: string;
  name: string;
  uid: string;
  owner_id: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },

owner_id: { type: mongoose.Types.ObjectId, ref: "user" },
});

const deviceModel = mongoose.model<Device>("device", userSchema);
export default deviceModel;
export { Device };
