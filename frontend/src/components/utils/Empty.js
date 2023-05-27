import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Empty = (props) => {
  return (
    <div className="rounded overflow-hidden text-gray-600 p-4 h-44 w-44 bg-gray-100 border-2 space-y-6 border-dashed border-black flex flex-col justify-center items-center shadow-lg">
      <FontAwesomeIcon icon={faFolderPlus} className="text-6xl text-gray-400" />
      <span className="flex-flex-col justify-center items-center text-center">
        <h1>{props.text}</h1>
        <h1 className="text-xl">Add Now</h1>
      </span>
    </div>
  );
};

export default Empty;
