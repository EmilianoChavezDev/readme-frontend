"use client";

import ProfileView from "@/components/common/ProfileView";
import ProfileHeader from "@/components/users/ProfileHeader";
import useUserInfo from "@/hooks/useUser";
import React, { useEffect } from "react";

const page = ({ params }) => {
  const { getUserInformation, data } = useUserInfo();

  useEffect(() => {
    getUserInformation(params.id);
  }, []);

  return (
    <div>
      <ProfileHeader
        username={data?.username}
        profile={data?.profile}
        portada={data?.portada}
      />
    </div>
  );
};

export default page;
