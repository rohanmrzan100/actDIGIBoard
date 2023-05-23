import {
  faChevronLeft,
  faEllipsisVertical,
  faImage,
  faPlus,
  faTrash,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadDeviceInfo } from "../../../API/Device";
import GoBack from "../../utils/GoBack";
const DeviceInfo = () => {
  // const navigate = useNavigate();
  const [userMedia, setUserMedia] = useState();
  const handleClick = () => {
    window.location.href = `/device/${localStorage.getItem("device")}/add`;
  };

  useEffect(() => {
    loadDeviceInfo(localStorage.getItem("device")).then((res) => {
      if (res.device.media) {
        console.log(res.device.media);
        setUserMedia(res.device.media);
      }
    });
  }, []);
  return (
    <div className="w-full ">
      <GoBack goto={`/devices`} />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">
          {" "}
          Media Present in this device
        </h1>
        <button
          onClick={handleClick}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded active:scale-105 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add More
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2  gap-x-4 gap-y-4 ">
        {userMedia &&
          userMedia.map((media) => {
            if (media.type === "video") {
              return (
                <div
                  className="rounded  overflow-hidden shadow-lg"
                  key={media._id}
                >
                  <video
                    poster={media.thumbnail}
                    controls
                    className="w-full h-48 object-cover brightness-90 hover:brightness-100"
                  >
                    <source src={media.media} type="video/mp4" />
                  </video>

                  <div className=" p-6 flex justify-between items-start">
                    <div className="flex  flex-start items-center">
                      <FontAwesomeIcon icon={faVideo} />
                      <div className="px-2">{media.name}</div>
                    </div>

                    <input
                      // onChange={(e) => handleChange(e, media)}
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    ></input>
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
                      <div className="px-2">{media.name}</div>
                    </div>

                    <input
                      // onChange={(e) => handleChange(e, media)}
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    ></input>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default DeviceInfo;
