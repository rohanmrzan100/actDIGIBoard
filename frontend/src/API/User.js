import axios from "axios";
import { store } from "../store/store";
import { setError } from "../store/slice/utilsSlice";
import { errorToast, successToast } from "../components/utils/Toast";
import { loginError, loginSuccess } from "../store/slice/authSlice";

axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.post["Content-Type"] = "application/json";
const headers = {
  Authorization: localStorage.getItem("token"),
};
export const register = async (data) => {
  try {
    const response = await axios.post("/api/user/register", data);
    successToast(response.data.msg);
    window.location.href = "/signin";
    return response.data;
  } catch (error) {
    store.dispatch(setError(error.response.data.msg));
    // console.log(error.response.data.msg);
    errorToast("Registration Failed");

    return error;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post("/api/user/login", data);
    successToast("Login Successful");
    store.dispatch(loginSuccess(response.data.token));

    return response.data;
  } catch (error) {
    store.dispatch(setError(error.response.data.msg));
    store.dispatch(loginError());

    errorToast("Login Failed");

    return error;
  }
};
export const upload_Image = async (image) => {
  try {
    const response = await axios.post(
      "/api/user/add_image",
      { image: image },
      {
        headers: headers,
      }
    );
    successToast("Image Uploaded Successfully");
    window.location.href = "/content";
    return response.data;
  } catch (error) {
    // store.dispatch(setError(error.response.data.msg));

    errorToast("Image Upload Failed");

    return error;
  }
};
export const upload_Video = async (video) => {
  try {
    const response = await axios.post(
      "/api/user/add_video",
      { video: video },
      {
        headers: headers,
      }
    );
    successToast("Video Uploaded Successfully");
    
    window.location.href = "/content";
    return response.data;
  } catch (error) {
    // store.dispatch(setError(error.response.data.msg));

    errorToast("Image Upload Failed");

    return error;
  }
};

export const getUserData = async () => {
  try {
    const response = await axios.get("/api/user/", { headers: headers });
    return response.data;
  } catch (error) {
    return error;
  }
};
