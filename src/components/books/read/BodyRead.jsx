import React from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import TextRead from "./TextRead";
import { UseRead } from "@/contexts/ReadProvider";
import { LuBookOpenCheck } from "react-icons/lu";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const BodyRead = () => {
  const { chapterData, getCurrentChapterById, data } = UseRead();
  const router = useRouter();

  const shouldSendTrueNextChapter =
    chapterData?.next_capitulo_id === null ? true : false;
  const shouldSendTruePreviousChapter =
    chapterData?.previous_capitulo_id === null ? true : false;

  return (
    <div className=" w-4/6 h-full">
      <div
        style={{ position: "fixed", left: "12%", top: "50%" }}
        className={`${!chapterData?.previous_capitulo_id ? "hidden" : ""}`}
      >
        {chapterData?.previous_capitulo_id && (
          <button
            className="p-2 rounded-full hover:scale-110 transform transition-all duration-200 "
            onClick={() =>
              getCurrentChapterById(
                chapterData.libro_id,
                chapterData?.previous_capitulo_id,
                shouldSendTruePreviousChapter
              )
            }
          >
            <CiCircleChevLeft size={42} />
          </button>
        )}
      </div>

      <div>
        <TextRead urlContenido={chapterData?.contenido} />
      </div>
      <div style={{ position: "fixed", right: "12%", top: "50%" }}>
        {chapterData?.next_capitulo_id ? (
          <button
            className="p-2 rounded-full hover:scale-110 transform transition-all duration-200"
            onClick={() =>
              getCurrentChapterById(
                chapterData.libro_id,
                chapterData?.next_capitulo_id,
                shouldSendTrueNextChapter
              )
            }
          >
            <CiCircleChevRight size={42} />
          </button>
        ) : (
          <button
            className="p-2 rounded-full hover:scale-110 transform transition-all duration-200"
            onClick={() => {
              getCurrentChapterById(
                chapterData.libro_id,
                data[0].id,
                shouldSendTrueNextChapter
              );
              router.push(`/books/${chapterData.libro_id}`);
              toast.success("Felicidades! Has terminado este libro");
            }}
          >
            <LuBookOpenCheck size={40} />
          </button>
        )}
      </div>
    </div>
  );
};

export default BodyRead;
