"use client";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import BookStatistics from "@/components/search/BookStatistics";

const RecycledBookItem = ({ book, onRestore, disableButton }) => {
  return (
    <div className="flex justify-between bg-buttonColorGray shadow-lg p-2 gap-4">
      <div className="flex gap-3">
        <div className="flex-grow">
          <Image
            src={
              book.portada.length ? book.portada : "/image/template_libro.png"
            }
            width={120}
            height={160}
            alt="Portada De Libro"
            priority={true}
            className=""
            style={{ height: "190px", maxWidth: "350px" }}
          />
        </div>

        <div className="col-span-12 _md:col-span-7">
          <div className="flex flex-col">
            <div>
              <Typography variant="h5" color="blue-gray">
                {book.titulo}
              </Typography>
            </div>
            <div className="-mt-2">
              <Typography variant="h6" color="blue-gray">
                <span className="font-semibold">
                  {book.cantidad_capitulos_publicados}
                </span>{" "}
                partes publicadas
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                <BookStatistics
                  views={book.cantidad_lecturas}
                  stars={book.cantidad_resenhas}
                  comments={book.cantidad_comentarios}
                />
              </Typography>
            </div>
            <div className="line-clamp-3">{book.sinopsis}</div>
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
