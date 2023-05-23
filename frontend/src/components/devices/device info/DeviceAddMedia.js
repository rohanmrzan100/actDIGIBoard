import React, { useEffect, useState } from "react";
import { getUserData } from "../../../API/User";

import MediaCard from "./Media";
import GoBack from "../../utils/GoBack";
import { loadDeviceInfo } from "../../../API/Device";

const Media = () => {
  const [userMedia, setUserMedia] = useState([]);

  useEffect(() => {
    getUserData()
      .then((res) => {
        if (res.doc) {
          setUserMedia(res.doc.media_id);
          console.log("all", res.doc.media_id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full ">
      <GoBack goto={`/device/${localStorage.getItem("device")}/info`} />
      <MediaCard media={userMedia} />
    </div>
  );
};

export default Media;
