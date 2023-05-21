// const cloudinary = require("cloudinary").v2;
import cloudinary from "cloudinary"
import "dotenv/config"
import env from "../env"



cloudinary.v2.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.API_KEY,
  api_secret: env.API_SECRET,
});


export default cloudinary
