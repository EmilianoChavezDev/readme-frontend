import React from "react";
import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";

const ChapterNotExist = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-center mb-4 font-bold">
          ¡Vaya! Parece que este libro aún no tiene ningún capítulo.
        </p>
        <Image
          src={"/image/bookNotExist.png"}
          width={300}
          height={300}
          alt="Imagen: Libro no existe"
        />
        <p className="text-center mt-4 _sm:px-0 px-9 mb-2">
          Pero no te preocupes, tenemos muchos otros libros interesantes para
          ti.
        </p>
        <Link
          href="/"
          className="bg-colorPrimario hover:bg-colorHoverPrimario text-white font-bold py-2 px-4 rounded"
        >
          Volver a inicio
        </Link>
      </div>
    </>
  );
};

export default ChapterNotExist;
