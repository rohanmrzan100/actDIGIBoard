import mongoose from "mongoose";

interface Devive {
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
  owner_id: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Types.ObjectId, ref: "user" },
});

const deviceModel = mongoose.model<Devive>("device", userSchema);
export default deviceModel;
export { deviceModel };
