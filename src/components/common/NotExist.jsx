import React from "react";
import Link from "next/link";
import Image from "next/image";

const NotExist = ({ message, butMessage }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="text-center mb-4 font-bold">{message}</p>
      <Image
        src={"/image/bookNotExist.png"}
        width={300}
        height={300}
        alt="Imagen: Libro no existe"
      />
      <p className="text-center mt-4 _sm:px-0 px-9 mb-2">{butMessage}</p>
      <Link
        href="/"
        className="bg-colorPrimario hover:bg-colorHoverPrimario text-white font-bold py-2 px-4 rounded dark:no-underline dark:bg-dark-darkColorButtons dark:hover:bg-dark-darkColorHover"
      >
        Volver a inicio
      </Link>
    </div>
  );
};

export default NotExist;
