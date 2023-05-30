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
    successToast("Device Added Successfully");
    store.dispatch(unsetError());
    window.location.href = "/devices";
    return response.data;
  } catch (error) {
    store.dispatch(setError("Adding device Failed"));
    errorToast("Adding Device Failed");

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
    store.dispatch(setError("Device adding failed."));
    errorToast("Device adding failed.");
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
    store.dispatch(setError("Deleting deive Failed"));
    errorToast("Deleting deive Failed");
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
    return response.data;
  } catch (error) {
    errorToast("Media Adding Failed");
    return error;
  }
};

export const loadDeviceInfo = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/device/get/${id}`,

      { headers: headers }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    errorToast("Loading device failed.");
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
    errorToast("Deleting Media Failed");
    return error;
  }
};

export const resyncDevice = async (id) => {
  try {
    const response = await axios.get(
      `api/device/sync_update/${id}`,

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
};

export const addPlaylistToDevice = async (did, pid) => {
  const response = await axios.post(
    `http://localhost:3001/api/device/add_playlist/${did}/${pid}`,

    { headers: headers }
  );
  console.log(response.data);
  return response.data;
};
export const removePlaylistFromDevice = async (did, pid) => {
  const response = await axios.delete(
    `http://localhost:3001/api/device/remove_playlist/${did}/${pid}`,

    { headers: headers }
  );
  // const response = await axios.delete(
  //   ` http://localhost:3001/api/device/remove_playlist/64745709618f1f335b4f3d3b/64755411135fc01d14e0da71`
  // );
  console.log(response.data);
  return response.data;
};

export const playPlaylist = async (did, pid) => {
  const response = await axios.post(`/api/device/play_playlist/${did}/${pid}`, {
    headers: headers,
  });

  return response.data
};
