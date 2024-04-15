"use client";

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import ProfileView from "../common/ProfileView";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function UserCard({
  username,
  nombre,
  image,
  description,
  canDelete = false,
  deleteButtonProps: { deleteInfo = "", onDelete = () => {} } = {},
  buttonProps: { info, onClick = () => {} },
  canFollow = true,
}) {
  const [usernameLs, setUsernameLs] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUsernameLs(localStorage.getItem("username"));
  }, []);

  const isMyUsername = useMemo(() => {
    return username === usernameLs;
  });

  return (
    <Card className="mt-6 w-64 min-h-52 py-4 overflow-hidden bg-buttonColorGray rounded-3xl shadow-xl">
      <div
        onClick={() => router.push(`/user/${username}`)}
        className="flex items-center justify-between mx-4 hover:cursor-pointer"
      >
        <span className="font-bold _md:text-lg">{nombre ?? username}</span>

        <ProfileView username={username} imagen={image} size={12} />
      </div>
      <CardBody className="_md:h-40 overflow-hidden">
        <Typography className="overflow-hidden truncate-lines text-sm _md:text-sm">
          {description}
        </Typography>
      </CardBody>

      {canFollow && (
        <CardFooter className="flex flex-row justify-center gap-x-3">
          {canDelete && (
            <div>
              <IconButton
                className="border border-red-800 bg-none text-red-800 bg-transparent hover:bg-red-800 hover:text-white"
                onClick={onDelete}
              >
                {deleteInfo}
              </IconButton>
            </div>
          )}
          <div className={`${isMyUsername && "py-5"}`}>
            {!isMyUsername && (
              <Button
                className="text-colorPrimario border border-colorPrimario bg-buttonColorGray hover:bg-colorHoverPrimario hover:text-white text-xs text-nowrap"
                onClick={onClick}
              >
                {info}
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
