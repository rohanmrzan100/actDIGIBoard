import mongoose from "mongoose";

interface Device {
  _id: string;
  name: string;
  uid: string;
  owner_id: string;
  playlist: string;
  change: boolean;
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
    change: {
      type: Boolean,
      default: false,
    },

    owner_id: { type: mongoose.Types.ObjectId, ref: "user" },
    playlist: { type: mongoose.Types.ObjectId, ref: "playlist" },
  },
  {
    timestamps: true,
  }
);

const deviceModel = mongoose.model<Device>("device", deviceSchema);
export default deviceModel;
export { Device };
