"use client";
import NavBar from "@/components/NavBar";
import BodyRead from "@/components/books/read/BodyRead";
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
    getChapter(params.id, data);
    return;
  }, [data]);

  return (
    <>
      <div className="hidden">
        <NavBar />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
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
          <div className="fixed bottom-0 bg-white z-10 p-4 w-full">
            <ProgressBar percentage={chapterData?.progreso * 100} />
          </div>
        </div>
      )}
    </>
  );
}
