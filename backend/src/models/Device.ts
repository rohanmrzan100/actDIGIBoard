import mongoose from "mongoose";

interface Device {
  _id: string;
  name: string;
  uid: string;
  owner_id: string;
  media: [string];
}

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },

    owner_id: { type: mongoose.Types.ObjectId, ref: "user" },
    media:[ { type: mongoose.Types.ObjectId, ref: "media" }],
  },
  {
    timestamps: true,
  }
);

const deviceModel = mongoose.model<Device>("device", deviceSchema);
export default deviceModel;
export { Device };
