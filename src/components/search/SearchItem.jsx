import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import BookStatistics from "./BookStatistics";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

const SearchItem = ({ book }) => {
    return (<div className="grid grid-cols-12 bg-gray-100 shadow-lg p-3 gap-4">
        <div className="col-span-12 _md:col-span-2 flex justify-center">
            <div>
                <Image
                    src={book.portada.length ? book.portada : "/image/template_libro.png"}
                    width={300}
                    height={300}
                    alt="Portada De Libro"
                    priority={true}
                />
            </div>
        </div>
        <div className="col-span-12 _md:col-span-7">
            <div className="flex flex-col">
                <div>
                    <Typography variant="h4" color="blue-gray">
                        {book.titulo}
                    </Typography>
                </div>
                <div className="-mt-2">
                    <Typography variant="lead" color="blue-gray">
                        <span className="font-bold">{book.cantidad_capitulos_publicados}</span> partes publicadas
                    </Typography>
                </div>
                <div className="mt-1">
                    <Typography variant="h5" color="blue-gray" className="flex flex-row gap-1 justify-start items-center"> 
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
                <div>
                    {book.sinopsis}
                </div>

            </div>
        </div>
        <div className="col-span-12 _md:col-span-3 flex justify-end gap-3 items-end">
            <Button size="sm" className="bg-gray-700 capitalize">
                <Link href={"/books/"+book.id}>
                    Ver Detalles
                </Link>
                
            </Button>
            <Button size="sm" className="bg-cyan-800 capitalize">
            <Link href={"/books/"+book.id+"/read"}>
                    Leer Libro
                </Link>
            </Button>
        </div>

    </div>);
}

export default SearchItem;