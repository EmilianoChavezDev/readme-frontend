"use client";

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
  const { getUserLecturas, data: lecturas } = useUserInfo();
  const [selectedOption, setSelectedOption] = useState("misLibros");

  useEffect(() => {
    getUserInformation(params.id);
  }, []);

  useEffect(() => {
    if (!data) return;
    getFollowFollowers(data?.id);
    getUserLecturas(1);
  }, [data]);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col h-full bg-gray-100">
          <div>
            <ProfileHeader
              name={data?.nombre}
              username={data?.username}
              profile={data?.profile}
              portada={data?.portada}
              followers={seguidoresSeguidos?.seguidores}
              follows={seguidoresSeguidos?.seguidos}
              read={lecturas?.total_items}
            />
          </div>
          <div className="bg-white">
            <UserOption
              isFollow={false}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
              username={data?.username}
            />
          </div>

          <div className="flex mx-auto w-5/6 mt-4 gap-x-4">
            <div>
              <ProfileInfoCard
                direction={data?.direccion}
                nacionalidad={data?.nacionalidad}
                birthday={data?.fecha_de_nacimiento}
                createAt={data?.created_at}
                description={data?.descripcion}
              />
            </div>
            <div className="flex flex-col w-full h-screen rounded-xl p-6 bg-white shadow-lg ml-10">
              {selectedOption === "misLibros" && (
                <div>
                  <div className="flex flex-col">
                    <span className="text-xl font-semibold">
                      Ultimos libros de {data?.username}
                    </span>
                    <span className="text-textColorGray text-sm">
                      6 libros publicados
                    </span>
                  </div>
                </div>
              )}
              {selectedOption === "listaLectura" && <p>Lista de lectura</p>}
              {selectedOption === "seguidos" && <p>Seguidos</p>}
              {selectedOption === "seguidores" && <p>Seguidores</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
