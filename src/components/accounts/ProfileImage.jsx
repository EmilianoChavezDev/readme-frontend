import useUser from "@/hooks/useUser";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProfileImageUploader = ({ username, profile }) => {
  const [profileImage, setProfileImage] = useState(profile);

  const initials = username
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="_lg:w-64">
      <div className="_lg:relative _lg:w-64">
        {profileImage ? (
          <Image
            className="_lg:w-64 h-64 rounded-full _lg:absolute"
            src={profileImage}
            alt=""
            width={200}
            height={200}
          />
        ) : (
          <div className="_lg:w-64 _lg:h-64 rounded-full _lg:absolute flex justify-center items-center bg-gray-200 text-colorPrimario text-6xl font-bold">
            {initials}
          </div>
        )}
        <label
          htmlFor="profile-input"
          className="_lg:w-64 _lg:h-64 group hover:bg-gray-200 opacity-60 rounded-full _lg:absolute flex-col gap-y-2 flex justify-center items-center cursor-pointer transition duration-500"
        >
          <Image
            className="hidden group-hover:block w-12"
            src="https://www.svgrepo.com/show/33565/upload.svg"
            alt=""
            width={200}
            height={200}
          />
          <span className="hidden _lg:group-hover:block">
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
