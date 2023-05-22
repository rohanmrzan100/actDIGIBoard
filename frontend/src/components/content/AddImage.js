import React, { useState } from "react";
import { upload_Image } from "../../API/User";
import { isloading } from "../../store/slice/utilsSlice";
import { useDispatch } from "react-redux";

const AddImage = () => {
  const [uploadImage, setUploadImage] = useState("");
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(uploadImage);
    //    dispatch(isloading({ type: "true" }))
    // upload_Image(uploadImage).then((res) =>
    //   dispatch(isloading({ type: "false" }))
    // );
  };
  const handleChange = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    if (!image) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      const uploadImage = reader.result;
      setUploadImage(uploadImage);
    };
  };

  return (
    <div>
      {" "}
      {/* <p className="my-6  p-2  text-red-700 font-semibold">
        Please Select Image File
      </p> */}
      {/* <h1 className="text-lg font-semibold">Image</h1> */}
      <form
        onSubmit={handleFormSubmit}
        className="w-full bg-gray-200  rounded-lg p-4 border-2 hover:bg-gray-100"
      >
        <label className="block mb-2 text-lg font-medium text-black">
          Upload Image File
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

export default AddImage;
