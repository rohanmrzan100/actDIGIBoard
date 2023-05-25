import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.post["Content-Type"] = "application/json";

const headers = {
  Authorization: localStorage.getItem("token"),
};

export const createPlaylist = async (name, array) => {
  const response = await axios.post(
    "api/playlist/create/",
    {
      name: name,
      array: array,
    },
    { headers: headers }
  );

  console.log(response);
  return response.data;
};

export const getPlaylist = async (id) => {
  const response = await axios.get(`/api/playlist/get/${id}`, {
    headers: headers,
  });

  return response.data;
};

export const deletePlaylist = async (id) => {
  const response = await axios.delete(`/api/playlist/delete/${id}`, {
    headers: headers,
  });

  return response.data;
};

export const deleteMediaFromPlaylist = async (mid, pid) => {
  const response = await axios.delete(
    `http://localhost:3001/api/playlist//media_delete/${pid}/${mid}`,
    {
      headers: headers,
    }
  );
  return response.data;
};
