"use client";
import React, { createContext } from "react";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";

// Define el valor predeterminado que se utilizará si no se proporciona un proveedor para el contexto.
const defaultValue = {
  // Define aquí las propiedades predeterminadas del contexto si las hay.
};

const ThemeContext = createContext(defaultValue);
export function UserCard({ username, nombre, image, description, isFolow }) {
  const initials = username
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <Card className="mt-6 _md:w-80 _md:h-80 h-52 py-4 overflow-hidden bg-buttonColorGray rounded-3xl shadow-xl">
      <div className="flex items-center justify-between mx-6 hover:cursor-pointer">
        <span className="font-bold _md:text-xl">{nombre}</span>
        {image ? (
          <Image
            src={image}
            alt="User"
            className="h-16 w-16 rounded-full"
            width={200}
            height={200}
          />
        ) : (
          <div className="flex items-center justify-center h-16 w-16 bg-blue-500 text-white rounded-full">
            {initials}
          </div>
        )}
      </div>
      <CardBody className="_md:h-40 overflow-hidden">
        <Typography className="overflow-hidden truncate-lines text-sm _md:text-base">
          {description}
        </Typography>
      </CardBody>

      <CardFooter className="flex justify-center p-0">
        <Button
          className="
        _md:px-6 _md:py-3 px-1 py-1
        flex text-colorPrimario border border-colorPrimario bg-buttonColorGray hover:bg-colorHoverPrimario hover:text-white"
        >
          {isFolow ? (
            <span className="flex items-center">
              <SlUserFollow className="inline-block align-middle mr-1  _md:w-4 _md:h-4" />
              Seguir
            </span>
          ) : (
            <span className="flex items-center">
              <SlUserUnfollow className="inline-block align-middle mr-1  _md:w-4 _md:h-4" />
              Dejar de seguir
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ThemeContext;
