"use client";

import { Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosStar } from "react-icons/io";
import { TbBook, TbRating18Plus } from "react-icons/tb";

export default function BookCard({ book }) {
  const SINOPSIS_MAX_LENGTH = 540;

  const router = useRouter();

  return (
    <div
      className="min-w-56 max-w-56"
      onClick={() => router.push(`/books/${book.id}`)}
    >
      <div className="group relative flex flex-col gap-2 cursor-pointer">
        {book.adulto && (
          <div className="absolute top-0 left-0 p-2">
            <TbRating18Plus className="text-5xl text-red-500" />
          </div>
        )}
        {book?.portada ? (
          <img
            src={book?.portada}
            className="object-cover aspect-portada"
            alt="Portada de Libro"
          />
        ) : (
          <div className="aspect-portada bg-colorPrimario flex justify-center items-center">
            <Image
              src="/image/g3.png"
              width={150}
              height={150}
              alt="Portada de Libro"
            />
          </div>
        )}
        <p>{book.titulo}</p>
        <div className="absolute text-xs min-w-56 max-w-56 h-full transition-transform duration-300 text-white opacity-0 hover:opacity-100 hover:scale-105 bg-black bg-opacity-60 backdrop-blur-lg p-2 flex flex-col gap-1">
          <p className="font-bold">{book.titulo}</p>
          <div className="flex gap-1">
            <span className="font-semibold">Autor:</span>
            <span>{book.autorUsername}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{book.puntuacion_media}</span>
            <span>
              <IoIosStar sise={12} />
            </span>
            <span>{`(${book.cantidad_resenhas} reseñas)`}</span>
          </div>
          <p>
            {book.sinopsis.length > SINOPSIS_MAX_LENGTH
              ? `${book.sinopsis.substring(0, SINOPSIS_MAX_LENGTH)}...`
              : book.sinopsis}
          </p>
          <div className="mt-auto mb-2 flex items-center justify-between">
            <span>{`${book.cantidad_capitulos_publicados} ${
              book.cantidad_capitulos_publicados === 1
                ? "capítulo"
                : "capítulos"
            }`}</span>
            {book.autorUsername !== localStorage.getItem("username") &&
              Boolean(book.cantidad_capitulos_publicados) && (
                <Tooltip content="Leer Libro">
                  <button
                    className="w-8 h-8 rounded-full hover:bg-gray-300 hover:text-gray-800 flex justify-center items-center"
                    onClick={(event) => {
                      router.push(`/books/${book.id}/read`);
                      event.stopPropagation();
                    }}
                  >
                    <TbBook size={22} />
                  </button>
                </Tooltip>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
