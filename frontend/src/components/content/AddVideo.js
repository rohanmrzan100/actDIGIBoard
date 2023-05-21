import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { isloading } from "../../store/slice/utilsSlice";
import { upload_Video } from "../../API/User";
const Addvideo = () => {
  const [video, setVideo] = useState();
  const [uploadVideo, setUploadVideo] = useState();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const video = e.target.files[0];
    setVideo(video);
    if (!video) {
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(video);

    reader.onloadend = () => {
      const uploadVideo = reader.result;
      setUploadVideo(uploadVideo);
    };
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(isloading({ type: "true" }));
    upload_Video(uploadVideo).then(() => {
      dispatch(isloading({ type: "false" }));
    });
    // console.log(uploadVideo);
  };

  return (
    <div>
      {/* <p className="my-6  p-2  text-red-700 font-semibold">
        Please Select Video File
      </p> */}

      <form
        onSubmit={handleFormSubmit}
        className="w-full bg-gray-200  rounded-lg p-4 border-2 hover:bg-gray-100"
      >
        <label className="block mb-2 text-lg font-medium text-black">
          Upload Video FIle
        </label>
        <input
          onChange={handleChange}
          className="block w-full  text-lg text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-200 focus:outline-none"
          id="file_input"
          type="file"
        />

        <button
          onChange={handleChange}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800  active:scale-105 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  mt-4 mb-2 "
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Addvideo;
