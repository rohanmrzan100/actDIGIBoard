import React, { useEffect, useState } from "react";
import { getUserData } from "../../../API/User";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import MediaCard from "./Media";
import GoBack from "../../utils/GoBack";

const Media = () => {
  const [userMedia, setUserMedia] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getUserData().then((res) => {
      setUserMedia(res.doc.media_id);
    });
  }, []);

  return (
    <div className="w-full ">
      
      <GoBack goto={`/device/${localStorage.getItem("device")}/info`} />
      <h1 className="text-2xl mb-8 font-semibold"> Add Media to your Device</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-4  ">
        {userMedia &&
          userMedia.map((media) => <MediaCard key={media._id} media={media} />)}
      </div>
    </div>
  );
};

export default Media;
