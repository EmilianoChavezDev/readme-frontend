import React from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import TextRead from "./TextRead";
import { UseRead } from "@/contexts/ReadProvider";

const BodyRead = () => {
  const { chapterData } = UseRead();

  console.log(chapterData);

  return (
    <div className=" w-4/6 h-full">
      <div
        style={{ position: "fixed", left: "12%", top: "50%" }}
        className={`${!chapterData?.previous_capitulo_id ? "hidden" : ""}`}
      >
        {chapterData?.previous_capitulo_id && (
          <button className="p-2 rounded-full hover:scale-110 transform transition-all duration-200 ">
            <CiCircleChevLeft size={42} />
          </button>
        )}
      </div>

      <div>
        <TextRead urlContenido={chapterData?.contenido} />
      </div>
      <div
        style={{ position: "fixed", right: "12%", top: "50%" }}
        className={`${!chapterData?.next_capitulo_id ? "hidden" : ""}`}
      >
        {chapterData?.next_capitulo_id && (
          <button className="p-2 rounded-full hover:scale-110 transform transition-all duration-200">
            <CiCircleChevRight size={42} />
          </button>
        )}
      </div>
    </div>
  );
};

export default BodyRead;
