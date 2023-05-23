import React, { useEffect, useState } from "react";

import { deleteMedia, getUserData } from "../../API/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { isloading } from "../../store/slice/utilsSlice";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";

const Media = () => {
  const [userMedia, setUserMedia] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserData().then((res) => {
      setUserMedia(res.doc.media_id);
    });
  }, []);

  const handleDelete = (id) => {
    dispatch(isloading({ type: "true" }));
    deleteMedia(id).then(() => {
      dispatch(isloading({ type: "false" }));
      window.location.reload(true);
    });
  };

  return (
    <div className="w-full mt-8 ">
      <h1 className="text-2xl mb-8 font-semibold"> Your Media</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2  gap-x-4 gap-y-4 ">
        {userMedia &&
          userMedia.map((media) => {
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
                    <div className="flex items-baseline">
                      <div className="">{media.name}</div>
                    </div>

                    <Popover placement="right">
                      <PopoverHandler>
                        <FontAwesomeIcon
                          icon={faEllipsisVertical}
                          className="scale-125"
                        />
                      </PopoverHandler>
                      <PopoverContent>
                        <div className="flex flex-col gap-2   text-lg">
                          <button
                            className="hover:bg-red-600 hover:text-white w-24 rounded-md"
                            onClick={() => handleDelete(media._id)}
                          >
                            Delete
                          </button>
                          <button
                            className="hover:bg-green-600 hover:text-white w-24 rounded-md"
                            onClick={() => window.location.replace(media.media)}
                          >
                            Preview
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
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
                    <div className="flex items-baseline">
                      <div className="">{media.name}</div>
                    </div>

                    <Popover placement="right">
                      <PopoverHandler>
                        <FontAwesomeIcon
                          icon={faEllipsisVertical}
                          className="scale-125"
                        />
                      </PopoverHandler>
                      <PopoverContent>
                        <div className="flex flex-col gap-2   text-lg">
                          <button
                            className="hover:bg-red-600 hover:text-white w-24 rounded-md"
                            onClick={() => handleDelete(media._id)}
                          >
                            Delete
                          </button>
                          <button
                            className="hover:bg-green-600 hover:text-white w-24 rounded-md"
                            onClick={() => window.location.replace(media.media)}
                          >
                            Preview
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Media;
