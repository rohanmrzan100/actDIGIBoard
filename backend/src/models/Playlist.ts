import mongoose from "mongoose";

interface Playlist {
  _id: string;
 media:[string]
}

const playlistSchema = new mongoose.Schema(
  {
    media: [{ type: mongoose.Types.ObjectId, ref: "media" }],
  },
  {
    timestamps: true,
  }
);

const playlistModel = mongoose.model<Playlist>("media", playlistSchema);
export default playlistModel;
export { Playlist };
