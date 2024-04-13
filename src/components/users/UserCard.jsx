"use client";

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import ProfileView from "../common/ProfileView";

export function UserCard({
  username,
  nombre,
  image,
  description,
  buttonProps: { info, onClick = () => {} },
}) {
  return (
    <Card className="mt-6 w-64 min-h-52 py-4 overflow-hidden bg-buttonColorGray rounded-3xl shadow-xl">
      <div className="flex items-center justify-between mx-6 hover:cursor-pointer">
        <span className="font-bold _md:text-lg">{nombre}</span>
        <ProfileView username={username} imagen={image} size={12} />
      </div>
      <CardBody className="_md:h-40 overflow-hidden">
        <Typography className="overflow-hidden truncate-lines text-sm _md:text-sm">
          {description}
        </Typography>
      </CardBody>

      <CardFooter className="flex justify-center p-0">
        <Button
          className="
          _md:px-6 _md:py-3 px-1 py-1
          flex text-colorPrimario border border-colorPrimario bg-buttonColorGray hover:bg-colorHoverPrimario hover:text-white"
          onClick={onClick}
        >
          {info}
        </Button>
      </CardFooter>
    </Card>
  );
}
