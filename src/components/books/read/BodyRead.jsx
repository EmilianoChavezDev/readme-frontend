import React from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import TextRead from "./TextRead";

const BodyRead = ({ capitulo }) => {
  console.log(capitulo);
  return (
    <div className=" w-4/6 h-full">
      <div
        style={{ position: "fixed", left: "12%", top: "50%" }}
        className={`${!capitulo?.previous_capitulo_id ? "hidden" : ""}`}
      >
        {capitulo?.previous_capitulo_id && (
          <button className="p-2 rounded-full hover:scale-110 transform transition-all duration-200 ">
            <CiCircleChevLeft size={42} />
          </button>
        )}
      </div>

      <div>
        <TextRead urlContenido={capitulo?.contenido} />
      </div>
      <div
        style={{ position: "fixed", right: "12%", top: "50%" }}
        className={`${!capitulo?.next_capitulo_id ? "hidden" : ""}`}
      >
        {capitulo?.next_capitulo_id && (
          <button className="p-2 rounded-full hover:scale-110 transform transition-all duration-200">
            <CiCircleChevRight size={42} />
          </button>
        )}
      </div>
    </div>
  );
};

export default BodyRead;
