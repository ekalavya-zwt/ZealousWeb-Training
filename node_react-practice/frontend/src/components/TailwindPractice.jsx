import React from "react";

const TailwindPractice = () => {
  return (
    <>
      {/* <button
        type="button"
        className="m-2 cursor-pointer rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 active:bg-blue-700"
      >
        Click me!
      </button> */}

      <div className="grid grid-cols-2 md:grid-cols-3">
        <div className="m-4 flex h-20 items-center justify-center rounded-md bg-red-400 text-3xl text-white ring-2 ring-red-500">
          Box 1
        </div>
        <div className="m-4 flex h-20 items-center justify-center rounded-md bg-yellow-400 text-3xl text-white ring-2 ring-yellow-500">
          Box 2
        </div>
        <div className="m-4 flex h-20 items-center justify-center rounded-md bg-green-400 text-3xl text-white ring-2 ring-green-500">
          Box 3
        </div>
      </div>
    </>
  );
};

export default TailwindPractice;
