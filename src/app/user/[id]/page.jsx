"use client";

import ProfileView from "@/components/common/ProfileView";
import Loader from "@/components/common/loader";
import ProfileHeader from "@/components/users/ProfileHeader";
import { ProfileInfoCard } from "@/components/users/ProfileInfoCard";
import UserOption from "@/components/users/UserOption";
import useUserInfo from "@/hooks/useUser";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const { getUserInformation, data } = useUserInfo();
  const {
    getFollowFollowers,
    data: seguidoresSeguidos,
    loading,
  } = useUserInfo();

  useEffect(() => {
    getUserInformation(params.id);
  }, []);

  useEffect(() => {
    if (!data) return;
    getFollowFollowers(data?.id);
    //console.log(seguidoresSeguidos)
  }, [data]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col">
          <ProfileHeader
            username={data?.username}
            profile={data?.profile}
            portada={data?.portada}
            followers={seguidoresSeguidos?.seguidores}
            follows={seguidoresSeguidos?.seguidos}
            isOwner={true}
          />
          <UserOption isOwner={true} isFollow={false} />
          <div className="mx-auto w-5/6 mt-4 shadow-sm">
            <ProfileInfoCard
              direction={data?.direccion}
              nacionalidad={data?.nacionalidad}
              birthday={data?.fecha_de_nacimiento}
              createAt={data?.created_at}
              description={data?.descripcion}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default page;
