import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

const BookCardList = ({ books }) => {
  return (
    <>
      {books.map((libro) => (
        <div
          key={libro.id}
          className="flex justify-center mr-8 shadow-sl transition-transform duration-300 transform hover:scale-110"
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <Link
            href={`/books/${libro.id}`}
            className="flex justify-center w-auto h-auto"
          >
            <Card
              shadow={false}
              className="relative grid w-customWidth h-customHeight items-end justify-center overflow-hidden text-center m-0 p-0"
            >
              <div className="absolute inset-0 shadow-md rounded-lg"></div>

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
                  width={200}
                  height={200}
                  className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center w-full h-40"
                />
                <div className="absolute inset-0 shadow-md rounded-lg"></div>
              </CardHeader>
              <CardBody className="relative py-12 px-6 md:px-8">
                <Typography
                  variant="h5"
                  color="white"
                  className="mb-2 font-medium leading-[1.5] text-sm"
                  style={{ textShadow: "0 0 2px #000" }}
                >
                  {libro.autorUsername}
                </Typography>
                <Typography
                  variant="h5"
                  color="white"
                  className="mb-2 font-bold leading-[1.5]"
                  style={{ fontSize: "25px", textShadow: "0 0 2px #000" }}
                >
                  {libro.titulo}
                </Typography>

                <Typography
                  variant="h5"
                  color="white"
                  className="mb-5 font-medium leading-[1.5] text-sm"
                  style={{
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textShadow: "0 0 2px #000",
                  }}
                >
                  {libro.sinopsis}
                </Typography>
              </CardBody>
            </Card>
          </Link>
        </div>
      ))}
    </>
  );
};

export default BookCardList;
