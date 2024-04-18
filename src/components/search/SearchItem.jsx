import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import BookStatistics from "./BookStatistics";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

const SearchItem = ({ book }) => {
  return (
    <div className="flex justify-between bg-buttonColorGray shadow-lg p-2 gap-4">
      <div className="flex gap-3">
        <div className="ml-3">
          <Image
            src={
              book.portada.length ? book.portada : "/image/template_libro.png"
            }
            width={120}
            height={160}
            alt="Portada De Libro"
            priority={true}
            style={{ height: "180px", width: "120px" }}
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
            <div>{book.sinopsis}</div>
          </div>
        </div>
      </div>
      <div className="col-span-12 _md:col-span-3 flex justify-end gap-3 items-end">
        <Button size="sm" className="bg-gray-700 capitalize">
          <Link href={"/books/" + book.id}>Ver Detalles</Link>
        </Button>
        <Button size="sm" className="bg-cyan-800 capitalize">
          <Link href={"/books/" + book.id + "/read"}>Leer Libro</Link>
        </Button>
      </div>
    </div>
  );
};

export default SearchItem;
