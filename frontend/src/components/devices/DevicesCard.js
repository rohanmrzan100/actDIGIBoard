import {
  faImage,
  faRotate,
  faSignal,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import moment from "moment";
import { removeDevice } from "../../API/Device";
import { isloading } from "../../store/slice/utilsSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDevice } from "../../store/slice/deviceSlice";
const DevicesCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(isloading({ type: "true" }));
    removeDevice(props.device._id).then((res) => {
      localStorage.removeItem("device");
      setInterval(() => {
        window.location.href = "/devices";
      }, 2000);
    });
  };

  const handleClick = () => {
    localStorage.setItem("device", props.device._id);
    dispatch(setDevice(props.device._id));
    // console.log(props.device._id);
    navigate(`/device/${props.device._id}/info`);
  };
  const date = moment(props.device.createdAt).format("YYYY MM DD,  h:mm a");
  return (
    <div className="my-4 px-6 py-8 md:py-12  rounded-xl md:flex-row flex flex-col  bg-gray-300 justify-between items-center  ">
      <div className="">
        <h1 className=" text-xl">{props.device.name}</h1>
        <p className="text-md font-semibold text-gray-500">
          {props.device.uid}
        </p>

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
          onClick={handleClick}
          className="flex flex-col items-center space-y-4 hover:text-red-700"
        >
          <FontAwesomeIcon
            icon={faImage}
            className="scale-150 text-ornage-500"
          />
          <p className="text-lg">Media Details</p>
        </button>
        <button
          onClick={handleDelete}
          className="flex flex-col items-center space-y-4 hover:text-orange-700"
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
