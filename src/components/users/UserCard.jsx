"use client";
import React, { createContext } from "react";
import { SlUserFollow } from "react-icons/sl";

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
export function UserCard({ username, nombre, image }) {
  const initials = username
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <Card className="mt-6 w-80 h-80 py-4 overflow-hidden bg-buttonColorGray">
      <div className="flex items-center justify-between mx-6 hover:cursor-pointer">
        <span className="font-bold">{nombre}</span>
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
      <CardBody className="h-40 overflow-hidden">
        <Typography className="overflow-hidden truncate-lines">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et
          necessitatibus magnam, fugiat numquam impedit dolorem a tempora ipsa
          eos nesciunt autem aspernatur distinctio rem! Veritatis assumenda
          fugiat necessitatibus et illum.
        </Typography>
      </CardBody>

      <CardFooter className="flex justify-center mt-4 p-0">
        <Button className="flex items-center text-colorPrimario border border-colorPrimario bg-buttonColorGray hover:bg-colorHoverPrimario hover:text-white">
          <SlUserFollow className="inline-block align-middle mr-1" size={18} />
          Seguir
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ThemeContext;
