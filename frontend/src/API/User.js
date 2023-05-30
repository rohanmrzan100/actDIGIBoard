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
    store.dispatch(setError("Registration Failed"));
    errorToast("Registration Failed");

    return error;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post("/api/user/login", data);
    successToast("Login Successful");
    console.log(response.data.token);
    store.dispatch(loginSuccess(response.data.token));
    window.location.href = "/content";
    return response.data;
  } catch (error) {
    store.dispatch(setError(error.response.data.msg));
    store.dispatch(loginError());
    errorToast("Login Failed");
    return error;
  }
};

export const getUserData = async () => {
  try {
    const response = await axios.get("/api/user/content", { headers: headers });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteMedia = async (id) => {
  try {
    const response = await axios.delete(`api/user/delete_media/${id}`, {
      headers: headers,
    });
    successToast("Medua deleted successfully");
    return response.data;
  } catch (error) {
    errorToast(error.response.data.msg);
    return error;
  }
};

//DON'T TOUCH THE  FUNCTION BELOW

export const uploadMedia = async (data) => {
  const image_ext = ["jpg", "jpeg", "png", "bmp", "webp"];
  const video_ext = ["mp4", "mov", "avi", "mkv", "webm", "m4v"];
  let file_type = " ";
  let { name } = data;
  if (!name) {
    setInterval(() => (window.location.href = "/content"), 3000);
    return errorToast("Upload Error.Try Again.Only upload Image or video.");
  }
  // console.log(name);
  const count = name.length;
  name = name.substring(count - 3, count);
  console.log(name);
  image_ext.forEach((ext) => {
    if (ext === name) {
      file_type = "image";
    }
  });
  video_ext.forEach((ext) => {
    if (ext === name) {
      file_type = "video";
    }
  });
  console.log(file_type);
  if (file_type === "image") {
    try {
      const response = await axios.post(
        "/api/user/add_image",
        { image: data.media, name: data.name },
        {
          headers: headers,
        }
      );
      successToast("Image Uploaded Successfully");
      window.location.href = "/content";
      return response.data;
    } catch (error) {
      errorToast("Image Upload Failed");
      console.log(error);
      return error;
    }
  } else if (file_type === "video") {
    try {
      const response = await axios.post(
        "/api/user/add_video",
        { video: data.media, name: data.name },
        {
          headers: headers,
        }
      );
      successToast("Video Uploaded Successfully");

      window.location.href = "/content";
      return response.data;
    } catch (error) {
      errorToast("Video Upload Failed");
      console.log(error);
      return error;
    }
  } else {
    errorToast("This file type cannot be uploaded.");

    setInterval(() => (window.location.href = "/content"), 3000);
    return;
  }
};

//DON'T TOUCH THE  FUNCTION ABOVE
