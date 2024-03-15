"use client";
import NavBar from "@/components/NavBar";
import BodyRead from "@/components/books/read/BodyRead";
import HeaderRead from "@/components/books/read/HeaderRead";
import ProgressBar from "@/components/books/read/ProgressBar";
import { UseRead } from "@/contexts/ReadProvider";
import { useEffect } from "react";

export default function ReadBook({ params }) {
  const { getAll, data, chapterData, isLoading } = UseRead();

  useEffect(() => {
    getAll(params.id);
  }, []);

  return (
    <>
      <div className="hidden">
        <NavBar />
      </div>
      {isLoading ? (
        <p>cargando...</p>
      ) : (
        <div>
          {/**Header */}
          <div className="sticky top-0 bg-white z-10 p-2">
            <HeaderRead
              titulo={chapterData.capitulo_actual?.titulo}
              id={params.id}
              capitulo={data}
            />
          </div>
          {/**cuerpo */}
          <div className="flex justify-center mt-10 my-24">
            <BodyRead capitulo={chapterData.capitulo_actual} />
          </div>
          {/**footer */}
          <div className="fixed bottom-0 bg-white z-10 p-4 w-full">
            <ProgressBar percentage={chapterData.capitulo_actual?.progreso} />
          </div>
        </div>
      )}
    </>
  );
}
