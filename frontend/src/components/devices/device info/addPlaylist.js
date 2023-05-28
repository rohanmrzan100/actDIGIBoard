import React, { useEffect, useState } from "react";
import Empty from "../../utils/Empty";

import { getUserData } from "../../../API/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Radio } from "@material-tailwind/react";
import { addPlaylistToDevice } from "../../../API/Device";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../utils/Toast";
import GoBack from "../../utils/GoBack";
import { isloading } from "../../../store/slice/utilsSlice";
import { useDispatch } from "react-redux";
const AddPlaylist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [pid, setPid] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const did = localStorage.getItem("device");
  useEffect(() => {
    getUserData().then((res) => {
      if (res.doc) {
        setPlaylist(res.doc.playlist);
      }
    });
  }, []);
  const handleClick = (pid) => {

    dispatch(isloading({ type: "true" }));
    addPlaylistToDevice(did, pid)
      .then((res) => {
        navigate("/devices");
        successToast("Playlist is added to device");
        
        dispatch(isloading({ type: "false" }));
      })
      .catch((err) => {
        errorToast("Error while addidng playlist");
        
        dispatch(isloading({ type: "false" }));
        console.log(err);
      });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setPid(e.target.value);
  };

  const image =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
  return (
    <div>
      <GoBack goto="/devices" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold"> Your Playlist</h1>
        <button
          onClick={() => handleClick(pid)}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded active:scale-105 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Select
        </button>
      </div>
      {playlist && playlist.length <= 0 && (
        <Empty text="You have not added any playlist." />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-8  md:grid-col-6 m-auto sm:grid-cols-4  gap-x-4 gap-y-4 ">
        {playlist &&
          playlist.map((playlist) => (
            <div
              className="rounded overflow-hidden shadow-lg"
              key={playlist._id}
              onChange={handleChange}
            >
              <img
                className="w-full h-24 object-cover"
                src={image}
                loading="lazy"
                alt={""}
              />

              <div className="px-4 flex justify-between items-center">
                <div className="flex items-center justify-start text-sm">
                  <FontAwesomeIcon icon={faCirclePlay} />
                  <div className="px-2">{playlist.name.substring(0, 15)}</div>
                </div>
                <Radio
                  id="blue"
                  name="color"
                  value={playlist._id}
                  color="blue"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddPlaylist;
