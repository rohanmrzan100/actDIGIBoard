import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addArray } from "../../../store/slice/arraySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { errorToast } from "../../utils/Toast";
import { add_media } from "../../../API/Device";
const MediaCard = (props) => {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(true);
  const media = props.media;
  const id = localStorage.getItem("device");
  let array = useSelector((state) => state.array);
  const handleAdd = () => {
    if (array.length <= 0) {
        errorToast("Plase select media before adding.")
      return;
    }
add_media(id,array).then(res=>{
    console.log(res);
})
  };
  return (
    <div>
      <div className=" relative w-84 my-4 mx-auto">
        {add ? (
          <img
            className={`w-full border-2 border-gray-500`}
            src={media.media}
            alt={media.type}
          />
        ) : (
          <img
            className={`w-full border-2 border-gray-500 scale-105 border-gray-400`}
            src={media.media}
            alt={media.type}
          />
        )}

        {add && (
          <button
            onClick={() => {
              setAdd(false);
              dispatch(addArray(media.media));
            }}
            className="absolute  left-0 top-0 bg-orange-500 text-white p-2 rounded hover:bg-orange-800 active:bg-orange-800 m-2"
            type="submit"
          >
            Add
          </button>
        )}
        {!add && (
          <div
            className="     absolute
            left-0
            top-0
            bg-green-500
            text-white
            p-2
            rounded
         
            m-2"
          >
            <FontAwesomeIcon icon={faCheck} />
          </div>
        )}
      </div>

      <button
        onClick={handleAdd}
        className="absolute h-16 w-16 rounded-full left-0 z-10 m-16 bottom-0 bg-green-500 text-white p-2 rounded hover:bg-green-800 active:bg-green-800 m-2"
      >
        <FontAwesomeIcon icon={faPlus} />
        Add
      </button>
    </div>
  );
};

export default MediaCard;
