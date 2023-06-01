import axios from "axios";
import { store } from "../store/store";
import { isloading, setError } from "../store/slice/utilsSlice";
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
    setInterval(() => {
      window.location.href = "/content";
      store.dispatch(isloading({ type: "false" }));
    }, 2000);
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

