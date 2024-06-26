"use client";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const PageUnderConstruction = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-3xl font-bold mb-4">Página en construcción</h1>
        <Image
          src="/image/under-construction-image.png"
          alt="Under Construction"
          width={400}
          height={400}
          className="max-w-full max-h-80vh mb-4"
        />
        <button
          className="bg-colorPrimario hover:bg-colorHoverPrimario text-white font-bold py-2 px-4 rounded"
          onClick={() => handleHomeClick()}
        >
          Volver a Inicio
        </button>
      </div>
    </div>
  );
};

export default PageUnderConstruction;
