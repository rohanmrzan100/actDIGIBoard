import { cleanEnv, port, str } from "envalid";
const env = cleanEnv(process.env, {
  PORT: port(),
  MONGO_URI: str(),
  SECRET: str(),
  CLOUD_NAME: str(),
  API_SECRET: str(),
  API_KEY:str()
});
export default env;
