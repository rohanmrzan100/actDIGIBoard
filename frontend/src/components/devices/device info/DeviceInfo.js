import { faChevronLeft, faEllipsisVertical, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadDeviceInfo } from "../../../API/Device";
import GoBack from "../../utils/GoBack";
const DeviceInfo = () => {
  const navigate = useNavigate()
  const [device,setDevice] = useState()
  const handleClick = ()=>{
    window.location.href = `/device/${localStorage.getItem("device")}/add`;
  }
  
  useEffect(()=>{
    loadDeviceInfo(localStorage.getItem("device")).then(res=>{
      setDevice(res.device)
    })
  },[])
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
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-x-4 gap-y-4 ">
        {device &&
          device.media.map((media) => (
            <div
              // href={media.media}
              className="w-72  group/main relative h-auto border-2 z-0 transition rounded-md  "
              key={media._id}
            >
              <img
                className="w-72 brightness-90 border-2"
                src={media.media}
                alt={media.type}
              />
              <button
                // onClick={}
                className="absolute mr-4 rounded-lg  right-0 top-0 group-hover/main:scale-100 scale-0 "
              >
                <div className="group/secondary relative flex justify-center">
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="  text-3xl text-yellow"
                  />
                  <span className="absolute left-0 w-24 z-50  bottom-5 scale-0 transition-all rounded bg-gray-800  text-lg text-white group-hover/secondary:scale-100  ">
                    <ul>
                      <li>
                        <div className="w-full rounded-md hover:bg-red-600 px-2 py-2 ">
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

export default DeviceInfo;
