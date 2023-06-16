import React from "react";

const Skeleton = () => {
  const array = [1, 2, 3, 4];

  return (
    <div className="grid  grid-cols-1 lg:grid-cols-4  md:grid-col-3 m-auto sm:grid-cols-2 xs:grid-col-2  gap-x-4 gap-y-4 ">
      {/* <div class="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
        <div class="lg:h-48 bg-gray-400 md:h-36 w-full object-cover object-center"></div>
        <div class="p-6">
          <h2 class="bg-gray-400 animate-pulse h-4 w-1/4 mb-2"></h2>
          <h1 class="w-1/2 mb-4 h-6 animate-pulse bg-gray-500"></h1>
          <p class="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-400"></p>
          <p class="leading-relaxed mb-3 w-2/3 h-3 animate-pulse bg-gray-400"></p>
          <p class="leading-relaxed mb-3 w-1/2 h-3 animate-pulse bg-gray-400"></p>
          <div class="flex items-center flex-wrap ">
            <a class="bg-indigo-300 h-4 animate-pulse mt-2 w-32 inline-flex items-center md:mb-2 lg:mb-0"></a>
            <span class="bg-indigo-300 w-16 mt-2 h-4 animate-pulse mr-3 px-2 inline-flex items-center ml-auto leading-none text-sm pr-5 py-1"></span>
          </div>
        </div>
      </div> */}
      {array.map((item) => (
        <div className="rounded overflow-hidden flex flex-col justify-between shadow-lg">
          <p class="leading-relaxed w-full h-44 animate-pulse bg-gray-400"></p>
          <div className="p-4 text-sm flex justify-between items-center ">
            <p class="leading-relaxed mb-3 w-8  h-6 animate-pulse bg-gray-400 mr-4"></p>

            <p class="leading-relaxed mb-3 w-full  h-3 animate-pulse bg-gray-400"></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
