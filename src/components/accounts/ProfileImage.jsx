import { useState } from "react";
import Image from "next/image";

const ProfileImageUploader = ({
  initials,
  profileImage,
  handleImageChange,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-64">
      <div className="relative w-64">
        {profileImage ? (
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
      </div>
    </div>
  );
};

export default ProfileImageUploader;
