import React from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import TextRead from "./TextRead";

const BodyRead = () => {
  return (
    <div className=" w-4/6 h-full">
      <div style={{ position: "fixed", left: "12%", top: "50%" }}>
        <button className="p-2 rounded-full hover:scale-110 transform transition-all duration-200 ">
          <CiCircleChevLeft size={42} />
        </button>
      </div>
      <div>
        <TextRead />
      </div>
      <div style={{ position: "fixed", right: "12%", top: "50%" }}>
        <button className="p-2 rounded-full hover:scale-110 transform transition-all duration-200">
          <CiCircleChevRight size={42} />
        </button>
      </div>
    </div>
  );
};

export default BodyRead;
