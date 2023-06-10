import React, { useEffect, useState } from "react";

import { deleteMedia, getUserData } from "../../API/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faImage,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { isloading } from "../../store/slice/utilsSlice";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import Empty from "../utils/Empty";
import PlaylistCard from "./playlist/PlaylistCard";
import { BASE_URL } from "../../Config";

const Media = () => {
  const [userMedia, setUserMedia] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isloading({ type: "true" }));
    getUserData().then((res) => {
        dispatch(isloading({ type: "false" }));
      if (res.doc) {
        setUserMedia(res.doc.media_id.reverse());

        console.log(res.doc.media_id);
        setPlaylist(res.doc.playlist);
      
      }
    });
  }, []);

  const handleDelete = (id) => {
    dispatch(isloading({ type: "true" }));
    deleteMedia(id).then(() => {
      setInterval(() => {
        window.location.reload(true);
        dispatch(isloading({ type: "false" }));
      }, 2000);
    });
  };

  return (
    <div className="w-full mt-8 ">
      <div className="mb-8">
        <h1 className="text-2xl mb-8 font-semibold"> Your Playlist</h1>
        {playlist && !playlist.length > 0 && (
          <Empty text="You have not added any playlist." />
        )}

        <div className="grid  grid-cols-1 lg:grid-cols-6  md:grid-col-4 m-auto sm:grid-cols-3 xs:grid-col-2  gap-x-4 gap-y-4 ">
          {playlist &&
            playlist.map((playlist) => (
              <PlaylistCard playlist={playlist} key={playlist._id} />
            ))}
        </div>
      </div>

      <h1 className="text-2xl mb-8 font-semibold"> Your Media</h1>

      <div className="grid  grid-cols-1 lg:grid-cols-6  md:grid-col-4 m-auto sm:grid-cols-3 xs:grid-col-2  gap-x-4 gap-y-4 ">
        {userMedia &&
          userMedia.map((media) => {
            if (media.type === "video") {
              return (
                <div
                  className="rounded overflow-hidden flex flex-col justify-between shadow-lg"
                  key={media._id}
                >
                  <video
                    poster={""}
                    controls
                    className="w-full h-32 object-cover brightness-90 hover:brightness-100"
                  >
                    <source src={media.media} type="video/mp4" />
                  </video>

                  <div className="p-4 text-sm flex  justify-between items-start">
                    <div className="flex  flex-start items-center">
                      <FontAwesomeIcon icon={faVideo} />
                      <div className="px-2">{media.name.substring(0, 10)}</div>
                    </div>

                    <Popover placement="right">
                      <PopoverHandler>
                        <FontAwesomeIcon
                          icon={faEllipsisVertical}
                          className="scale-150 cursor-pointer hover:text-gray-700"
                        />
                      </PopoverHandler>
                      <PopoverContent className="bg-gray-200 border-2 border-black ">
                        <ul className="font-semibold space-y-2 text-md">
                          <li>
                            {" "}
                            <button
                              className="hover:bg-red-600 hover:text-white w-full h-10 border-black rounded-md text-red-600  border-2"
                              onClick={() => handleDelete(media._id)}
                            >
                              Delete
                            </button>
                          </li>

                          <li>
                            <a
                              href={BASE_URL + media.media}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="hover:bg-green-600 border-2 h-10  border-black text-green-600 hover:text-white w-24 rounded-md">
                                Preview
                              </button>
                            </a>
                          </li>
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="rounded overflow-hidden flex flex-col justify-between shadow-lg"
                  key={media._id}
                >
                  <img
                    alt=""
                    src={media.media}
                    className="w-full h-32 object-cover brightness-90 hover:brightness-100"
                  />

                  <div className="p-4 text-sm flex justify-between items-start">
                    <div className="flex  flex-start items-center">
                      <FontAwesomeIcon icon={faImage} />
                      <div className="px-2">{media.name.substring(0, 10)}</div>
                    </div>

                    <Popover placement="right">
                      <PopoverHandler>
                        <FontAwesomeIcon
                          icon={faEllipsisVertical}
                          className="scale-150 cursor-pointer hover:text-gray-700"
                        />
                      </PopoverHandler>
                      <PopoverContent className="bg-gray-200 border-2 border-black ">
                        <ul className="font-semibold space-y-2 text-md">
                          <li>
                            {" "}
                            <button
                              className="hover:bg-red-600 hover:text-white w-full h-10 border-black rounded-md text-red-600  border-2"
                              onClick={() => handleDelete(media._id)}
                            >
                              Delete
                            </button>
                          </li>

                          <li>
                            <a
                              href={BASE_URL + media.media}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="hover:bg-green-600 border-2 h-10  border-black text-green-600 hover:text-white w-24 rounded-md">
                                Preview
                              </button>
                            </a>
                          </li>
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              );
            }
          })}

        {userMedia && !userMedia.length > 0 && (
          <Empty text="You have not added any Media." />
        )}
      </div>
    </div>
  );
};

export default Media;
