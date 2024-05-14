import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { TbRating18Plus } from "react-icons/tb";
import BookStatistics from "./BookStatistics";

const SearchItem = ({ book }) => {
  return (
    <div className="flex justify-between bg-buttonColorGray shadow-lg p-2 gap-4 dark:bg-dark-darkColorNeutral">
      <div className="flex gap-3">
        <div className="flex-grow relative">
          <Image
            src={
              book.portada.length ? book.portada : "/image/template_libro.png"
            }
            width={120}
            height={160}
            alt="Portada De Libro"
            priority={true}
            style={{ height: "190px", maxWidth: "350px" }}
          />
          {book.adulto && (
            <div className="absolute top-0 left-0 p-2">
              <TbRating18Plus className="text-5xl bg-white rounded-full text-red-500 dark:bg-red-500" />
            </div>
          )}
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
            <div className="mt-1">
              <Typography
                variant="h6"
                color="blue-gray"
                className="flex flex-row gap-1 justify-start items-center"
              >
                <FaUser />
                {book.autorUsername}
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
            <div class="line-clamp-3">{book.sinopsis}</div>
          </div>
        </div>
      </div>
      <div className="col-span-12 _md:col-span-3 flex justify-end gap-3 items-end text-nowrap">
        <Button
          size="sm"
          className="bg-gray-700 capitalize dark:bg-dark-darkColorButtons dark:hover:bg-dark-darkColorHover"
        >
          <Link id="view-more" href={"/books/" + book.id}>
            Ver Detalles
          </Link>
        </Button>
        <Button
          size="sm"
          className="bg-cyan-800 capitalize dark:bg-dark-darkColorButtons dark:hover:bg-dark-darkColorHover"
        >
          <Link id="read-book" href={"/books/" + book.id + "/read"}>
            Leer Libro
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SearchItem;
