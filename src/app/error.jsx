"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ErrorPage = ({ error }) => {
  const router = useRouter();
  const handleHome = () => {
    router.push("/");
  };

  const handleRecharge = () => {
    window.location.reload();
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="/image/bookNotExist.png"
        alt="Error 404"
        width={300}
        height={300}
      />
      <h1 className="text-4xl font-bold mb-4">Oops! Ha ocurrido un problema</h1>
      <p className="text-lg mb-8">
        Por favor, busca ayuda si el problema persiste.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={handleRecharge}
          className="px-4 py-2 border border-colorPrimario text-colorPrimario rounded hover:bg-colorPrimario hover:text-white focus:outline-none focus:bg-colorPrimario focus:text-white transition duration-300"
        >
          Volver a intentar
        </button>
        <button
          onClick={handleHome}
          className="px-4 py-2 border border-colorPrimario text-colorPrimario rounded hover:bg-colorPrimario hover:text-white focus:outline-none focus:bg-colorPrimario focus:text-white transition duration-300"
        >
          {" "}
          Volver al inicio
        </button>{" "}
      </div>
    </div>
  );
};

export default ErrorPage;
