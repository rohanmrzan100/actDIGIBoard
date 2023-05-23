import axios from "axios";
import { store } from "../store/store";
import { setError, unsetError } from "../store/slice/utilsSlice";
import { errorToast, successToast } from "../components/utils/Toast";

axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.post["Content-Type"] = "application/json";

const headers = {
  Authorization: localStorage.getItem("token"),
};

export const addDevice = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/device/add",
      data,
      { headers: headers }
    );
    successToast(response.data.msg);
    store.dispatch(unsetError());
    window.location.href = "/devices";
    return response.data;
  } catch (error) {
    store.dispatch(setError(error.response.data.msg));
    console.log(error.response.data.msg);
    errorToast(error.response.data.msg);

    return error;
  }
};

export const getDevices = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/user/view_devices",

      { headers: headers }
    );
    successToast(response.data.msg);
    store.dispatch(unsetError());
    return response.data;
  } catch (error) {
    store.dispatch(setError(error.response.data.msg));
    console.log(error.response.data.msg);
    errorToast(error.response.data.msg);
    return error;
  }
};
export const removeDevice = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/api/device/delete/${id}`,

      { headers: headers }
    );
    successToast(response.data.msg);
    store.dispatch(unsetError());
    return response.data;
  } catch (error) {
    store.dispatch(setError(error.response.data.msg));
    console.log(error.response.data.msg);
    errorToast(error.response.data.msg);
    return error;
  }
};

export const add_media = async (id, array) => {
  try {
    let media = [];
    array.map((item) => media.push(item));
    const response = await axios.post(
      `http://localhost:3001/api/device/add_media/${id}`,
      { array: media },
      { headers: headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    errorToast(error.response.data.msg);
    return error;
  }
};

export const loadDeviceInfo = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/device/get/${id}`,

      { headers: headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    errorToast(error.response.data.msg);
    return error;
  }
};

export const deleteMedia = async (did, mid) => {
  try {
    const response = await axios.delete(
      `api/device/remove_media/${did}/${mid}`,

      { headers: headers }
    );
    console.log(response.data);
    successToast("Media removed from device successfully");
    return response.data;
  } catch (error) {
    console.log(error);
    errorToast(error.response.data.msg);
    return error;
  }
};



export const resyncDevice = async (id)=>{
  try {
       const response = await axios.delete(
         `api/device/update_sync/${id}`,

         { headers: headers }
       );
       console.log(response.data);
       successToast("Device is Synced");
       return response.data;
  } catch (error) {
     console.log(error);
     errorToast("Error in syncing device");
     return error;
  }
}