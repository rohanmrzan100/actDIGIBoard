import mongoose from "mongoose";

interface Media {
  _id: string;
  media: string;
  type:string
}

const mediaSchema = new mongoose.Schema(
  {
    media: {
      type: String,
      required: true,
    },
    type:String
  },
  {
    timestamps: true,
  }
);

const mediaModel = mongoose.model<Media>("media", mediaSchema);
export default mediaModel;
export { Media };
