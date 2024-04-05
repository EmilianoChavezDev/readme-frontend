import React from "react";
import ProfileView from "../common/ProfileView";

const ProfileHeader = ({
  profile,
  follows,
  followers,
  read,
  username,
  name,
  portada,
}) => {
  return (
    <div className="flex flex-col justify-center">
      <div
        className="w-full h-56 bg-cover bg-center"
        style={{ backgroundImage: `url(${portada})` }}
      >
        <div className="flex justify-center items-center h-full">
          <ProfileView username={username} imagen={profile} size={44} />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
