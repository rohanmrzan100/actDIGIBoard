import React from "react";
const device_id = localStorage.getItem("device")
const DeviceInfo = () => {
  const handleClick = ()=>{
    window.location.href = `/device/${localStorage.getItem("device")}/add`;
  }
  
  return (
    <div>
      <button
      onClick={handleClick}
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded active:scale-105 focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Add
      </button>
    </div>
  );
};

export default DeviceInfo;
