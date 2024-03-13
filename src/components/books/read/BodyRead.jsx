import React from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import TextRead from "./TextRead";

const BodyRead = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center w-4/6 h-full">
        <div className="sticky top-0">
          <button className="bg-gray-200 p-2 rounded-full">
            <CiCircleChevLeft size={36} />
          </button>
        </div>
        <div>
          <TextRead />
        </div>
        <div className="sticky top-0">
          <button className="bg-gray-200 p-2 rounded-full">
            <CiCircleChevRight size={36} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BodyRead;
