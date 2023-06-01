import React, { useEffect, useState } from "react";
import Empty from "../../utils/Empty";

import { getUserData } from "../../../API/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Radio } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPlaylistToDevice } from "../../../API/Device";
import { errorToast, successToast } from "../../utils/Toast";
import { isloading } from "../../../store/slice/utilsSlice";
import { BASE_URL } from "../../../Config";
import { getNotAssignedPlaylist } from "../../../API/Playlist";

const AddPlaylist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [pid, setPid] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const did = localStorage.getItem("device");
  useEffect(() => {
    getNotAssignedPlaylist(did)
      .then((res) => {
        console.log(res);
        if (res.doc) {
          setPlaylist(res.doc.notassigned);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleClick = (pid) => {
    dispatch(isloading({ type: "true" }));
    addPlaylistToDevice(did, pid)
      .then((res) => {
        successToast("Playlist added Successfully");
        navigate("/device/playlist/add");
        setInterval(() => {
          window.location.reload(false);
          dispatch(isloading({ type: "false" }));
        }, 2000);
      })
      .catch((err) => {
        dispatch(isloading({ type: "false" }));
        console.log(err);
        errorToast("Adding playlist to device unsuccessful");
      });
  };

  const handleChange = (e) => {
    setPid(e.target.value);
  };

  const image =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">All Playlist Created By You</h1>
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

      <div className="grid grid-cols-1 lg:grid-cols-6  md:grid-col-4 m-auto sm:grid-cols-3 xs:grid-col-2  gap-x-4 gap-y-4 ">
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
