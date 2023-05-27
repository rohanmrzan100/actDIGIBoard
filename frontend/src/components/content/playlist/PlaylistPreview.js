import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faTrash,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {

  Tooltip,
} from "@material-tailwind/react";
import { deleteMediaFromPlaylist, getPlaylist } from "../../../API/Playlist";
import { errorToast, successToast } from "../../utils/Toast";
import { isloading } from "../../../store/slice/utilsSlice";
import GoBack from "../../utils/GoBack";
import Empty from "../../utils/Empty";

const Preview = () => {
  const playlist_id = useSelector((state) => state.utils.playlist_id);
  const [playlist, setPlaylist] = useState();
  const [media, setMedia] = useState([]);

  const dispatch = useDispatch();
  const id = localStorage.getItem("playlist");
  useEffect(() => {
    getPlaylist(id)
      .then((res) => {
        if (res.foundPlaylist) {
          setPlaylist(res.foundPlaylist);
          console.log(res.foundPlaylist);
          setMedia(res.foundPlaylist.media);
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast("Error Loading Playlist");
      });
  }, []);

  const handleDelete = (mid, pid) => {
      dispatch(isloading({ type: "true" }));
    deleteMediaFromPlaylist(mid, pid)
      .then((res) => {
        dispatch(isloading({ type: "false" }));
        successToast("Media Removed from Playlist");
        window.location.reload(false);
        //reload page
      })
      // .catch((err) => {
      //   dispatch(isloading({ type: "false" }));
      //   errorToast("Error removing media ");
      //   //reload page
      //   window.location.reload(false);
      // });
  };

  return (
    <div className="w-full mt-8 ">
      <GoBack  goto={"/content"}/>
      <h1 className="text-2xl mb-8 font-semibold">
        {playlist && playlist.name}
      </h1>
      <p className="my-4">Media Present In this playlist</p>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2  gap-x-4 gap-y-4 ">

        {media.length>0?  media &&
          media.map((media) => {
            if (media.type === "video") {
              return (
                <div
                  className="rounded overflow-hidden shadow-lg"
                  key={media._id}
                >
                  <video
                    poster={media.thumbnail}
                    controls
                    className="w-full h-48 object-cover brightness-90 hover:brightness-100"
                  >
                    <source src={media.media} type="video/mp4" />
                  </video>

                  <div className="p-6 flex justify-between items-start">
                    <div className="flex  flex-start items-center">
                      <FontAwesomeIcon icon={faVideo} />
                      <div className="px-2">{media.name.substring(0, 15)}</div>
                    </div>
                    <Tooltip content="Remove Media from Playlist">
                      <button
                        className="hover:text-red-700 hover:scale-110   text-red-600  "
                        onClick={() => handleDelete(media._id, playlist._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="rounded overflow-hidden shadow-lg"
                  key={media._id}
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={media.media}
                    loading="lazy"
                    alt={""}
                  />

                  <div className="p-6 flex justify-between items-start">
                    <div className="flex items-center justify-start">
                      <FontAwesomeIcon icon={faImage} />
                      <div className="px-2">{media.name.substring(0, 15)}</div>
                    </div>
                    <Tooltip content="Remove Media from Playlist">
                      <button
                        className="hover:text-red-700 hover:scale-110   text-red-600  "
                        onClick={() => handleDelete(media._id, playlist_id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              );
            }
          }) :<Empty text="No Media Added in this Playlist"/>}
        
      </div>
    </div>
  );
};

export default Preview;
