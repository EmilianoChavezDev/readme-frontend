import React from "react";
import ProfileView from "../common/ProfileView";
import { Button } from "@material-tailwind/react";

const ProfileHeader = ({
  profile,
  follows,
  followers,
  read,
  username,
  name,
  portada,
  isOwner,
}) => {
  return (
    <div className="flex flex-col justify-center">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${portada})` }}
      >
        <div className="flex justify-center items-center h-full mt-4">
          <ProfileView username={username} imagen={profile} size={44} />
        </div>
        <div
          className={`flex justify-center items-center text-white gap-x-4 pt-8 ${
            !isOwner && "py-8"
          } font-semibold`}
        >
          <div className="flex flex-col items-center">
            <span>{followers}</span>
            Seguidores
          </div>
          <div className="flex flex-col items-center">
            <span>2</span>
            Lista de lectura
          </div>
          <div className="flex flex-col items-center">
            <span>{follows}</span>
            Seguidos
          </div>
        </div>
        {isOwner && (
          <div className="flex items-end justify-end mb-2 mx-2">
            <Button>Editar Perfil</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
