import React, { useEffect, useState } from "react";
import { getUserData } from "../../../API/User";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import MediaCard from "./Media";

const Media = () => {
  const [userMedia, setUserMedia] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getUserData().then((res) => {
      setUserMedia(res.doc.media_id);
    });
  }, []);

  return (
    <div className="w-full mt-8 ">
      <button
        onClick={() =>
          navigate(`/device/${localStorage.getItem("device")}/info`)
        }
        className=" flex items-center justify-center  px-4 rounded-md text-lg h-16 hover:bg-gray-300  m-2"
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="scale-150 mx-2 text-green-500"
        />
        <p className="text-lg">Go Back To Previous Page</p>
      </button>

      <hr className="h-px my-4 border-0 bg-gray-700"></hr>
      <h1 className="text-2xl mb-8 font-semibold"> Add Media to your Device</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-4  ">
        {userMedia &&
          userMedia.map((media) => (
           <MediaCard key = {media._id} media = {media}/>
          ))}
      </div>
    </div>
  );
};

export default Media;
