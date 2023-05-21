import React, { useEffect, useState } from "react";
import { getUserData } from "../../API/User";

const Media = () => {
  const [userMedia, setUserMedia] = useState([]);

  useEffect(() => {
    getUserData().then((res) => {
      setUserMedia(res.doc.media_id);
    });
  }, []);

  return (
    <div className="w-full mt-8">
      <h1 className="text-2xl mb-8 font-semibold"> Your Media</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-4 ">
        {userMedia &&
          userMedia.map((media) => (
            <a
              href={media.media}
              className="w-72  h-auto border-2 hover:scale-105 transition border-gray-400 rounded-md block "
              key={media._id}
            >
              <img
                className="object-cover"
                src={media.media}
                alt={media.type}
              />
            </a>
          ))}
      </div>
    </div>
  );
};

export default Media;
