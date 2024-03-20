import React, { useEffect, useState } from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import TextRead from "./TextRead";
import { UseRead } from "@/contexts/ReadProvider";
import { LuBookOpenCheck } from "react-icons/lu";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSwipeable } from "react-swipeable";
import { Tooltip } from "@material-tailwind/react";

const BodyRead = () => {
  const { chapterData, getCurrentChapterById, data } = UseRead();
  const router = useRouter();

  const shouldSendTrueNextChapter =
    chapterData?.next_capitulo_id === null ? true : false;
  const shouldSendTruePreviousChapter =
    chapterData?.previous_capitulo_id === null ? true : false;

  const handleSwipeLeft = () => {
    if (chapterData?.next_capitulo_id) {
      getCurrentChapterById(
        chapterData.libro_id,
        chapterData.next_capitulo_id,
        shouldSendTrueNextChapter
      );
    } else {
      getCurrentChapterById(
        chapterData.libro_id,
        data[0].id,
        shouldSendTrueNextChapter
      );
      router.push(`/books/${chapterData.libro_id}`);
      toast.success("¡Felicidades! Has terminado este libro");
    }
  };

  const handleSwipeRight = () => {
    if (chapterData?.previous_capitulo_id) {
      getCurrentChapterById(
        chapterData.libro_id,
        chapterData.previous_capitulo_id,
        shouldSendTruePreviousChapter
      );
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="_sm:w-4/6 w-full mx-auto relative" {...swipeHandlers}>
      <div
        className="hidden _sm:block"
        style={{ position: "fixed", left: "10%", top: "50%" }}
      >
        {!chapterData?.previous_capitulo_id ? null : (
          <Tooltip content="capitulo anterior" className="hidden _lg:block">
            <button
              className="p-2 rounded-full hover:scale-110 transform transition-all duration-200"
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
          </Tooltip>
        )}
      </div>

      <div>
        <TextRead urlContenido={chapterData?.contenido} />
      </div>

      <div
        className="hidden _sm:block"
        style={{ position: "fixed", right: "10%", top: "50%" }}
      >
        {chapterData?.next_capitulo_id ? (
          <Tooltip content="siguiente capitulo" className={`hidden _lg:block`}>
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
          </Tooltip>
        ) : (
          <Tooltip content="terminar libro">
            <button
              className="p-2 rounded-full hover:scale-110 transform transition-all duration-200"
              onClick={() => {
                getCurrentChapterById(
                  chapterData.libro_id,
                  data[0].id,
                  shouldSendTrueNextChapter
                );
                router.push(`/books/${chapterData.libro_id}`);
                toast.success("¡Felicidades! Has terminado este libro");
              }}
            >
              <LuBookOpenCheck size={40} />
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default BodyRead;
