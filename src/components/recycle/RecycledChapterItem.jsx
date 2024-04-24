"use client";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";

const RecycledBookItem = ({ chapter, onRestore, disableButton }) => {
  return (
    <div className="flex justify-between bg-buttonColorGray shadow-lg p-2 gap-4">
      <div className="flex gap-3">
        <div className="flex-grow">
          <Image
            src={
              chapter.libroPortada.length
                ? chapter.libroPortada
                : "/image/template_libro.png"
            }
            width={120}
            height={160}
            alt="Portada De Libro"
            priority={true}
            className=""
            style={{ height: "190px", maxWidth: "350px" }}
          />
        </div>
        <div className="flex flex-col">
          <div>
            <Typography variant="h5" color="blue-gray">
              Libro: {chapter.tituloLibro}
            </Typography>
          </div>
          <div>
            <Typography variant="h5" color="blue-gray">
              Titulo del capitulo: {chapter.titulo}
            </Typography>
          </div>
        </div>
      </div>
      <div className="col-span-12 _md:col-span-3 flex justify-end gap-3 items-end text-nowrap">
        <Button
          size="sm"
          className="bg-gray-700 capitalize"
          onClick={onRestore}
          disabled={disableButton}
        >
          Restaurar
        </Button>
      </div>
    </div>
  );
};

export default RecycledBookItem;
