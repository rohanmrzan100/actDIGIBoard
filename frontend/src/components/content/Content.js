import React, { useEffect } from "react";
import AddImage from "./AddImage";
import AddVideo from "./AddVideo";
import { useDispatch } from "react-redux";
import Media from "./Media";

const Content = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="">
        <h1 className="text-2xl font-semibold w-full mb-8 ">
          Add Image or Video
        </h1>

        <div className="flex lg:flex-row flex-col justify-between item-center w-full ">
          <AddImage />
          <AddVideo />
        </div>
      </div>
      <hr className="h-px my-4 border-0 bg-gray-700"></hr>
      <Media />
    </div>
  );
};

export default Content;
