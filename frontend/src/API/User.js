import axios from "axios";
import { store } from "../store/store";
import { setError } from "../store/slice/utilsSlice";
import { errorToast, successToast } from "../components/utils/Toast";
import { loginError, loginSuccess } from "../store/slice/authSlice";

axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.post["Content-Type"] = "application/json";

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
    window.location.href = "/home";
    return response.data;
  } catch (error) {
    store.dispatch(setError(error.response.data.msg));
    store.dispatch(loginError());

    errorToast("Login Failed");

    return error;
  }
};
