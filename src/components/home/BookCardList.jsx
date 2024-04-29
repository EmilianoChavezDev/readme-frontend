import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import tooltip from "@material-tailwind/react";

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
            <Card className="relative grid w-64 h-96 items-end justify-center overflow-hidden text-center m-0 p-0">
              <div className="absolute inset-0 shadow-md rounded-lg"></div>

              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-72 w-full object-cover rounded-none bg-cover bg-center"
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
              <CardBody className="relative py-6 px-6 flex flex-col items-center justify-center">
                <Typography
                  variant="h5"
                  color="black"
                  className="mb-2 font-medium leading-[1.5] text-sm"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                  }}
                >
                  {libro.autorUsername}
                </Typography>

                <Tooltip content={libro.titulo}>
                    <Typography
                  variant="h5"
                  color="black"
                  className="mb-2 font-bold leading-[1.5] text-lg w-48 truncate"
                >
                    {libro.titulo}
                </Typography>
                  
                </Tooltip>
              </CardBody>
            </Card>
          </Link>
        </div>
      ))}
    </>
  );
};

export default BookCardList;
