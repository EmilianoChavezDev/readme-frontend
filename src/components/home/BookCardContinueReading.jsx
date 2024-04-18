import React from "react";
import { Card, CardHeader } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

const BookCardContinueReading = ({ libros }) => {
  return (
    <>
      {libros.map((libro, index) => (
        <div
          key={libro.id}
          className={`flex justify-center ${index > 0 ? "ml-4" : ""}`}
          style={{ position: "relative" }}
        >
          <Link
            href={`/books/${libro.id}`}
            className="flex justify-center w-auto h-auto"
          >
            <Card
              shadow={false}
              className="relative grid w-customWidth h-customHeight items-end justify-center overflow-hidden text-center transition-transform duration-300 transform hover:scale-110"
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
              >
                <Image
                  src={
                    libro?.portada.length
                      ? libro.portada
                      : "/image/template_libro.png"
                  }
                  alt={`Portada del libro "${libro.titulo}"`}
                  width={250}
                  height={350}
                  className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                />
              </CardHeader>
            </Card>
          </Link>
        </div>
      ))}
    </>
  );
};

export default BookCardContinueReading;
