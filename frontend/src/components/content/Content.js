import React, { useEffect } from "react";
import AddImage from "./AddImage";
import AddVideo from "./AddVideo";
import Media from "./Media";

const Content = () => {

  return (
    <div>
      <div className="">
        <h1 className="text-2xl font-semibold w-full mb-8 ">
          Add Image or Video
        </h1>

        <div className="flex lg:flex-row flex-col justify-start  space-x-4 item-center w-full ">
          <AddImage />
          <AddVideo />
        </div>
      </div>
      <hr className="h-px my-4 border-0 bg-gray-700"></hr>

      {/* <video poster="https://picsum.photos/seed/picsum/200/300" controls>
        <source
          src="/213371346/stock-video-33rd-happy-birthday-text-greeting.html"
          type="video/mp4"
        />
      </video> */}
      <Media />
    </div>
  );
};

export default Content;
