"use client";

import { ProfileInfoCard } from "@/components/users/ProfileInfoCard";
import useUserInfo from "@/hooks/useUser";
import React, { useEffect } from "react";

const page = ({ params }) => {
  const { getUserInformation, data } = useUserInfo();

  useEffect(() => {
    getUserInformation(params.id);
  }, []);

  return (
    <div>
      <ProfileInfoCard
        direction={data?.direccion}
        nacionalidad={data?.nacionalidad}
        birthday={data?.fecha_de_nacimiento}
        createAt={data?.created_at}
        description={data?.descripcion}
      />
    </div>
  );
}

export default page;
