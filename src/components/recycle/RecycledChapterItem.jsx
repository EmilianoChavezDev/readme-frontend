"use client";
import { Button, Typography } from "@material-tailwind/react";
import moment from "moment";
import Image from "next/image";
import { TbRating18Plus } from "react-icons/tb";

const RecycledBookItem = ({ chapter, onRestore }) => {
  return (
    <div className="flex justify-between bg-buttonColorGray shadow-lg p-2 gap-4 dark:bg-dark-darkColorNeutral">
      <div className="flex gap-3">
        <div className="flex-grow relative">
          <Image
            src={
              chapter.portada.length
                ? chapter.portada
                : "/image/template_libro.png"
            }
            width={120}
            height={160}
            alt="Portada De Libro"
            priority={true}
            className=""
            style={{ height: "190px", maxWidth: "350px" }}
          />
          {chapter.adulto && (
            <div className="absolute top-0 left-0 p-2">
              <TbRating18Plus className="text-5xl text-red-500 dark:text-red-500" />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="line-clamp-3">
            <Typography variant="h5" color="blue-gray">
              Capitulo del libro: {chapter.titulo_libro}
            </Typography>
          </div>
          <div className="line-clamp-3">
            <Typography variant="h5" color="blue-gray">
              Titulo del capitulo: {chapter.titulo}
            </Typography>
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Eliminado en fecha:{" "}
              {moment(chapter?.updated_at).format("DD/MM/YYYY")}
            </Typography>
          </div>
        </div>
      </div>
      <div className="col-span-12 _md:col-span-3 flex justify-end gap-3 items-end text-nowrap ">
        <Button
          size="sm"
          className="bg-gray-700 capitalize hover:bg-gray-800 shadow-md transition duration-300 ease-in-out dark:bg-dark-darkColorButtons dark:hover:bg-dark-darkColorHover"
          onClick={onRestore}
        >
          Restaurar
        </Button>
      </div>
    </div>
  );
};

export default RecycledBookItem;
