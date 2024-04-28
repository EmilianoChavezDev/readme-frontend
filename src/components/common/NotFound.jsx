import React from "react";
import Link from "next/link";
import Image from "next/image";

const NotFound = ({ message, butMessage }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-center font-bold mb-2">{message}</p>
      <Image
        src="/image/bookNotExist.png"
        width={300}
        height={300}
        alt="Imagen: Libro no existe"
      />
      <p className="text-center mt-2 mb-4">{butMessage}</p>
      <Link
        href="/"
        className="bg-colorPrimario hover:bg-colorHoverPrimario text-white font-bold py-2 px-4 rounded dark:no-underline dark:bg-dark-darkColorButtons dark:hover:bg-dark-darkColorHover"
      >
        Volver a inicio
      </Link>
    </div>
  );
};
export default NotFound;
