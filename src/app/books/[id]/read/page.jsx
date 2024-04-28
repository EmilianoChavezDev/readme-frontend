"use client";
import NavBar from "@/components/NavBar";
import BodyRead from "@/components/books/read/BodyRead";
import NotExist from "@/components/common/NotExist";
import HeaderRead from "@/components/books/read/HeaderRead";
import ProgressBar from "@/components/books/read/ProgressBar";
import Loader from "@/components/common/loader";
import { UseRead } from "@/contexts/ReadProvider";
import { useEffect } from "react";

export default function ReadBook({ params }) {
  const { getAll, data, chapterData, isLoading, getChapter } = UseRead();

  useEffect(() => {
    getAll(params.id);
  }, []);

  useEffect(() => {
    if (!data) return;
    getChapter(params.id, data);
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data.length > 0 ? (
        <div>
          {/**Header */}
          <div className="sticky top-0 bg-white z-10 p-2">
            <HeaderRead
              titulo={chapterData?.titulo}
              id={params.id}
              capitulo={data}
            />
          </div>
          {/**cuerpo */}
          <div className="flex justify-center mt-10 my-24">
            <BodyRead />
          </div>
          {/**footer */}
          <div className="fixed bottom-0 bg-white z-10 p-4 w-full ">
            <ProgressBar percentage={chapterData?.progreso * 100} />
          </div>
        </div>
      ) : (
        <NotExist
          message={
            " ¡Vaya! Parece que este libro aún no tiene ningún capítulo."
          }
          butMessage={
            " Pero no te preocupes, tenemos muchos otros libros interesantes para ti. "
          }
        />
      )}
    </>
  );
}
