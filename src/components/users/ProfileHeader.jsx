import React, { useEffect, useMemo, useState } from "react";
import ProfileView from "../common/ProfileView";
import { Button } from "@material-tailwind/react";
import { BsPersonFillGear } from "react-icons/bs";

const ProfileHeader = ({
  profile,
  follows,
  followers,
  read,
  username,
  name,
  portada,
  buttonProps: { info, onClick = () => {} },
}) => {
  const [usernameLs, setUsernameLs] = useState(null);

  useEffect(() => {
    setUsernameLs(localStorage.getItem("username"));
  }, []);

  const isMyProfile = useMemo(() => {
    return usernameLs === username;
  });

  return (
    <div
      className={`flex flex-col justify-center ${
        portada ? "text-white" : "text-black"
      }`}
    >
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: portada
            ? `url(${portada})` 
            : "linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent)",
        }}
      >
        <div className="flex justify-center items-center h-full mt-4">
          <ProfileView username={username} imagen={profile} size={44} />
        </div>
        <div className="flex flex-col items-center justify-center mt-2 ">
          <span className="font-bold">{name}</span>
          <span className="text-md">@{username}</span>
        </div>
        <div
          className={`flex justify-center items-center text-white text-sm gap-x-8 pt-8 ${
            usernameLs !== username && "py-8"
          } font-semibold`}
        >
          <div className="flex flex-col items-center">
            <span>{followers}</span>
            Seguidores
          </div>
          <div className="flex flex-col items-center">
            <span>{read}</span>
            Lista de lectura
          </div>
          <div className="flex flex-col items-center">
            <span>{follows}</span>
            Seguidos
          </div>
        </div>
        {isMyProfile && (
          <div className="flex items-end justify-end mb-2 mx-2 ">
            <button
              className="flex rounded-lg items-center px-1 py-2
             border border-colorPrimario bg-transparent hover:bg-colorHoverPrimario gap-x-2"
              onClick={onClick}
            >
              {info}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
