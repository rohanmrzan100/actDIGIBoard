import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const GoBack = (props) => {
  const navigate = useNavigate();

  return (
    <div className="">

      <button
        onClick={() => {
          navigate(`${props.goto}`);
        //   console.log(props.goto);
        }}
        className=" flex items-center justify-center  px-4 rounded-md text-lg h-16 hover:bg-gray-300  m-2"
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="scale-150 mx-2 text-green-500"
        />
        <p className="text-lg">Go Back To Previous Page</p>
      </button>
      <hr className="h-px my-4 border-0 bg-gray-700"></hr>
    </div>
  );
};

export default GoBack;
