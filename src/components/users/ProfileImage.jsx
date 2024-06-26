import { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@/contexts/UserProvider";

const ProfileImageUploader = ({
  profileImage,
  handleImageChange,
  handleDeleteProfile,
  isDeleteProfile,
  username,
  fileInputKey,
}) => {
  const [hovered, setHovered] = useState(false);
  const { isOpen } = useUser();

  const initials = username
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <div className="w-64 flex flex-col justify-center">
      <div className="w-64 flex flex-col justify-center">
        {profileImage ? (
          <Image
            className="w-64 h-64 rounded-full"
            src={profileImage}
            alt=""
            width={200}
            height={200}
          />
        ) : (
          <div className="w-64 h-64 rounded-full flex justify-center items-center bg-gray-200 text-colorPrimario text-6xl font-bold">
            {initials}
          </div>
        )}
        <label
          htmlFor="profile-input"
          className={`w-64 h-64 group hover:bg-gray-200 opacity-60 rounded-full absolute flex-col gap-y-2 flex justify-center items-center cursor-pointer transition duration-500 ${
            hovered && "opacity-100"
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ zIndex: 1 }}
        >
          <Image
            className={`w-12 ${!hovered && "hidden"}`}
            src="https://www.svgrepo.com/show/33565/upload.svg"
            alt=""
            width={200}
            height={200}
          />
          <span className={`group-hover:block ${!hovered && "hidden"}`}>
            Actualiza tu perfil
          </span>
        </label>
        <input
          key={fileInputKey}
          type="file"
          id="profile-input"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      {profileImage && !isDeleteProfile && (
        <button
          onClick={handleDeleteProfile}
          className={`${
            isOpen
              ? "opacity-0"
              : "top-0 right-0 m-2 text-sm py-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all transform opacity-100 duration-700"
          }`}
          style={{ zIndex: 50 }}
        >
          Eliminar foto de perfil
        </button>
      )}
    </div>
  );
};

export default ProfileImageUploader;
