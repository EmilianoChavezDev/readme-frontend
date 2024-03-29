import { useState } from "react";
import Image from "next/image";

const ProfileImageUploader = ({
  initials,
  profileImage,
  handleImageChange,
  handleDeleteProfile,
  isDeleteProfile,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-64 relative">
      <div className="w-64 relative">
        {profileImage && !isDeleteProfile ? (
          <Image
            className="w-64 h-64 rounded-full absolute"
            src={profileImage}
            alt=""
            width={200}
            height={200}
          />
        ) : (
          <div className="w-64 h-64 rounded-full absolute flex justify-center items-center bg-gray-200 text-colorPrimario text-6xl font-bold">
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
          style={{ zIndex: 1 }} // Añadir zIndex más alto
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
          type="file"
          id="profile-input"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        />
        {profileImage && !isDeleteProfile && (
          <button
            onClick={handleDeleteProfile}
            className={`absolute top-0 right-0 mt-2 mr-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-600`}
            style={{ zIndex: 0 }}
          >
            Borrar perfil
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileImageUploader;
