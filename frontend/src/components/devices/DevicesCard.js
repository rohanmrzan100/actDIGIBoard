import {
  faRotate,
  faSignal,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import moment from "moment";
import { removeDevice } from "../../API/Device";
import { isloading } from "../../store/slice/utilsSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const DevicesCard = (props) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const handleDelete = () => {
    dispatch(isloading({ type: "true" }));
    removeDevice(props.device._id).then((res) => {
      setInterval(() => {
        window.location.href = "/devices";
      }, 2000);
    });
  };

  const handleClick = ()=>{
   window.location.href = `devices/${props.device._id}/info`
  }
  const date = moment(props.device.createdAt).format("YYYY MM DD,  h:mm a");
  return (
    <div onClick={handleClick} className="my-4 px-6 py-12  rounded-xl flex  bg-gray-300 justify-between items-center hover:bg-gray-200 active:scale-105 ">
      <div className="">
        <h1 className=" text-xl">{props.device.name}</h1>
        <p className="text-xs text-gray-500">Added On : {date}</p>
      </div>

      <div className="flex justify-between items-center space-x-12  ">
        <div className="flex flex-col items-center space-y-4">
          <FontAwesomeIcon
            icon={faSignal}
            className="scale-150 text-green-500"
          />
          <p className="text-lg">Status</p>
        </div>
        <div className="flex flex-col items-center space-y-4 ">
          <FontAwesomeIcon
            icon={faRotate}
            className="scale-150 text-green-500"
          />
          <p className="text-lg">inSync</p>
        </div>
        <button
          onClick={handleDelete}
          className="flex flex-col items-center space-y-4"
        >
          <FontAwesomeIcon
            icon={faTrashCan}
            className="scale-150 text-red-500"
          />
          <p className="text-lg">Remove</p>
        </button>
      </div>
    </div>
  );
};

export default DevicesCard;
