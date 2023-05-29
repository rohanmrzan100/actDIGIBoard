import mongoose from "mongoose";

interface Device {
  _id: string;
  name: string;
  uid: string;
  owner_id: string;
  c_playlist: string;
  sfd_playlist: string;
  a_playlist: [string];
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
    //current playing playlist
   c_playlist: { type: String },

   ///send for download
   sfd_playlist: { type: String },

   //assigned playist
   a_playlist: [{ type: mongoose.Types.ObjectId, ref: "playlist" }],
  },
  {
    timestamps: true,
    
  }
);

const deviceModel = mongoose.model<Device>("device", deviceSchema);
export default deviceModel;
export { Device };
