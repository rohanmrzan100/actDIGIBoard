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
      if (res.doc) {
         setUserMedia(res.doc.media_id);
      }
   
    }).catch(error=>{
      console.log(error);
    })
  }, []);

  return (
    <div className="w-full ">
      <GoBack goto={`/device/${localStorage.getItem("device")}/info`} />
      <MediaCard media={userMedia} />
    </div>
  );
};

export default Media;
