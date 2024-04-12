"use client";

import MyBooksContainer from "@/components/books/mybooks/BooksContainer";
import Loader from "@/components/common/loader";
import SearchItem from "@/components/search/SearchItem";
import ProfileHeader from "@/components/users/ProfileHeader";
import { ProfileInfoCard } from "@/components/users/ProfileInfoCard";
import UserOption from "@/components/users/UserOption";
import useBook from "@/hooks/useBook";
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
  const { getAllBooks } = useBook();
  const [selectedOption, setSelectedOption] = useState("misLibros");
  const [arrBooks, setArrBooks] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    getUserInformation(params.id);
  }, []);

  useEffect(() => {
    if (!data) return;
    getFollowFollowers(data?.id);
    getUserLecturas(1, data?.id);
    getAllUserBooks(data?.id);
  }, [data]);

  const getAllUserBooks = async (id) => {
    const option = {
      page: 1,
      user_id: id,
    };
    const bookData = await getAllBooks(option);
    setArrBooks(bookData);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    console.log(arrBooks);
  }, [arrBooks]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-100">
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
            <div className="flex flex-col w-full h-full rounded-xl p-6 bg-white shadow-lg ml-10">
              {selectedOption === "misLibros" && (
                <div>
                  <div className="flex flex-col">
                    <span className="text-xl font-semibold">
                      Ultimos libros de {data?.nombre || data?.username}
                    </span>
                    <span className="text-textColorGray text-sm">
                      6 libros publicados
                    </span>
                    <div className="flex flex-col gap-y-3 mt-3">
                      {arrBooks?.data?.map((lectura) => (
                        <MyBooksContainer
                          key={lectura.id}
                          libroData={lectura}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedOption === "listaLectura" && (
                <div>
                  <div className="flex flex-col">
                    <span className="text-xl font-semibold">
                      Lista de lectura de {data?.nombre || data?.username}
                    </span>
                    <span className="text-textColorGray text-sm">
                      {lecturas?.total_items} libros leidos
                    </span>
                    <div className="flex flex-col gap-y-5 mt-3">
                      {lecturas?.libros?.map((lectura) => (
                        <SearchItem key={lectura?.id} book={lectura} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
