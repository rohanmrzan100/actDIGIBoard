import React, { useEffect, useState } from "react";
import { deleteMedia, getUserData } from "../../API/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { isloading } from "../../store/slice/utilsSlice";

const Media = () => {
  const [userMedia, setUserMedia] = useState([]);
  const dispatch  = useDispatch()
  useEffect(() => {
    getUserData().then((res) => {
      setUserMedia(res.doc.media_id);
    });

  
  }, []);
  const handleDelete = (id)=>{
    dispatch(isloading({type:"true"}))
deleteMedia(id).then(()=>{
  
    dispatch(isloading({ type: "false" }));
   window.location.reload(true)
})
  }
  return (
    <div className="w-full mt-8">
      <h1 className="text-2xl mb-8 font-semibold"> Your Media</h1>
      {/* {empty && (
        <p className=" p-2  text-red-700 font-semibold">
          You have not upload any media. Please upload media.
        </p>
      )} */}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-x-4 gap-y-4 ">
        {userMedia &&
          userMedia.map((media) => (
            <div
              // href={media.media}
              className="w-72  group/main relative h-auto border-2 z-0 transition rounded-md  "
              key={media._id}
            >
              <img
                className="w-72 brightness-75 hover:brightness-100  border-2"
                src={media.media}
                alt={media.type}
              />
              <button
                // onClick={}
                className="absolute mr-4 rounded-lg  right-0 top-2 group-hover/main:scale-100 scale-0 "
              >
                <div className="group/secondary relative flex justify-center">
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="  text-3xl text-orange-700"
                  />
                  <span className="absolute left-0 w-24 z-50  bottom-5 scale-0 transition-all rounded bg-gray-800  text-lg text-white group-hover/secondary:scale-100  ">
                    <ul>
                      <li>
                        {" "}
                        <div onClick={()=>handleDelete(media._id)} className="w-full rounded-md hover:bg-red-600 px-2 py-2 ">
                          Delete
                        </div>
                      </li>
                    </ul>
                  </span>
                </div>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Media;
