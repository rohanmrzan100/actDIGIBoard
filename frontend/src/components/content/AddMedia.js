import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { isloading } from "../../store/slice/utilsSlice";
import axios from "axios";
import { errorToast, successToast } from "../utils/Toast";
import { baseURL } from "../../Constants";
const AddMedia = () => {
  const dispatch = useDispatch();
  const [empty, setEmpty] = useState(false);
  const [file, setFile] = useState();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    dispatch(isloading({ type: "true" }));
    formdata.append("media", file);
    console.log(formdata);
    if (!FormData) {
      setEmpty(true);
    }
    try {
      dispatch(isloading({ type: "false" }));
      await axios.post(baseURL + "/api/media/upload", formdata, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      successToast("File Added Successfully ");
      window.location.reload(false);
    } catch (error) {
      if (error.response) {
        errorToast(error.response.data.msg);
      }
      console.log(error);
    }
  };
  return (
    <div>
      {empty && (
        <p className="my-6  p-2  text-red-700 font-semibold">
          Please Select Image or Video File to upload
        </p>
      )}
      <form
        // encType="multipart/form-data"
        onSubmit={handleFormSubmit}
        className="w-full bg-gray-200  rounded-lg p-4 border-2 hover:bg-gray-100"
      >
        <label className="block mb-2 text-lg font-medium text-black">
          Upload Video or Image
        </label>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name="media"
          className="block w-full  text-lg text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-200 focus:outline-none"
          id="file_input"
        />

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800  active:scale-105 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  mt-4 mb-2 "
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default AddMedia;
