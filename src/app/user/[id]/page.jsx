"use client";

import MyBooksContainer from "@/components/books/mybooks/BooksContainer";
import NotExist from "@/components/common/NotExist";
import Loader from "@/components/common/loader";
import SearchItem from "@/components/search/SearchItem";
import ProfileHeader from "@/components/users/ProfileHeader";
import { ProfileInfoCard } from "@/components/users/ProfileInfoCard";
import { UserCard } from "@/components/users/UserCard";
import UserOption from "@/components/users/UserOption";
import useBook from "@/hooks/useBook";
import useUserInfo from "@/hooks/useUser";
import { IconButton, Spinner, Typography } from "@material-tailwind/react";
import { all } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import { FaArrowDown, FaUpload } from "react-icons/fa";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";

const page = ({ params }) => {
  const { getUserInformation, data } = useUserInfo();
  const {
    getFollowFollowers,
    data: seguidoresSeguidos,
    loading,
  } = useUserInfo();
  const { getUserLecturas, data: lecturas, loading: lecturasLoading } = useUserInfo();
  const {deleteFollower} = useUserInfo()
  const { follow } = useUserInfo();
  const { unfollow } = useUserInfo();
  const { getAllBooks,isLoading: librosLoading } = useBook();
  const [selectedOption, setSelectedOption] = useState("misLibros");
  const [arrBooks, setArrBooks] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [usernameLs, setUsernmeLs] = useState(null);

  const { getFollowers, currentData: pageFollowers, loading: followersLoading } = useUserInfo()
  const [allFollowers, setAllFollowers] = useState([])
  const [followersPage, setFollowersPage] = useState(0)
  const [followersLastPage, setFollowersLastPage] = useState(false)

  const { getFollowed, currentData: pageFollowed, loading: followedLoading } = useUserInfo()
  const [allFOllowed, setAllFollowed] = useState([])
  const [followedPage, setFollowedPage] = useState(0)
  const [followedLastPage, setFollowedLastPage] = useState(false)

  const [allLecturas, setAllLecturas] = useState([])
  const [lecturaPage, setLecturaPage] = useState(0)
  const [lecturaLastPage, setLecturaLastPage] = useState(false)

  const [allLibros, setAllLibros] = useState([])
  const [libroPage, setLibroPage] = useState(0)
  const [libroLastPage, setLibroLastPage] = useState(false)
  const [cantLibros,setCantLibros] = useState(0)



  useEffect(() => {
    getUserInformation(params.id);
  }, []);

  useEffect(() => {
    if (!data) return;
    setAllFollowers([])
    setFollowersPage(1)

    setAllFollowed([])
    setFollowedPage(1)

    setAllLecturas([])
    setLecturaPage(1)

    setAllLibros([]);
    setLibroPage(1);


    getFollowFollowers(data?.id);
    getUserLecturas(1, data?.id);
    getAllUserBooks(data?.id, 1);
    getFollowers(data?.id, 1)
    getFollowed(data?.id, 1)
    setUsernmeLs(localStorage.getItem("username"));
  }, [data]);

  useEffect(() => {
    if (!pageFollowers) return
    const followers = pageFollowers?.users ?? []
    setAllFollowers([...allFollowers, ...followers])
    setFollowersLastPage(followersPage >= pageFollowers.total_pages)
  }, [pageFollowers])

  useEffect(() => {
    if (!pageFollowed) return
    const followed = pageFollowed?.users ?? []
    setAllFollowed([...allFOllowed, ...followed])
    setFollowedLastPage(followedPage >= pageFollowed.total_pages)
  }, [pageFollowed])

  useEffect(() => {
    if (!lecturas) return
    const findedLecturas = lecturas?.libros ?? []
    setAllLecturas([...allLecturas, ...findedLecturas])
    setLecturaLastPage(lecturaPage >= lecturas.total_pages)
  }, [lecturas])

  useEffect(() => {
    if (!arrBooks) return;
    const findedLibros = arrBooks?.data ?? [];
    setCantLibros(arrBooks?.total_items ?? 0)
    setAllLibros(prevLibros => [...prevLibros, ...findedLibros]);
    setLibroLastPage(libroPage >= arrBooks.total_pages);
  }, [arrBooks]);


  const getAllUserBooks = async (id, page) => {
    const option = {
      page,
      user_id: id,
    };
    const bookData = await getAllBooks(option);
    setArrBooks(bookData);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };


  const isMyBook = useMemo(() => {
    return usernameLs !== data?.username;
  });

  const handleFollow = async (id) => {
    try {
      await follow(id)
      getUserInformation(params.id)
    } catch (e) {
      console.log(e)
    }
  }

  const handleUnfollow = async (id) => {
    try {
      await unfollow(id)
      getUserInformation(params.id)
    } catch (e) {
      console.log(e)
    }
  }

  const handleFollowedNextPage = () => {
    setFollowedPage(followedPage + 1)
    getFollowed(data?.id, followedPage + 1)
  }

  const handleFollowersNextPage = () => {
    setFollowersPage(followersPage + 1)
    getFollowers(data?.id, followersPage + 1)
  }


  const handleLecturasNextPage = () => {
    setLecturaPage(prevPage => prevPage + 1);
    getUserLecturas(lecturaPage + 1,data?.id);
  }

  const handleLibrosNextPage = () => {
    setLibroPage(prevPage => prevPage+1)
    getAllUserBooks(data?.id,libroPage+1)
  }

  const handleDeleteFollower = async (id) => {
    try {
      await deleteFollower(id)
      getUserInformation(params.id)
    } catch (e) {
      console.log(e)
    }
  }


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
              isFollow={data?.seguidor}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
              username={data?.username}
              handleFollow={handleFollow}
              handleUnfollow={handleUnfollow}
              id={data?.id}
            />
          </div>

          <div className="grid grid-cols-12 mt-4 gap-y-16 gap-x-10 px-10">
            <div className="col-span-12 _md:col-span-3">
              <ProfileInfoCard
                direction={data?.direccion}
                nacionalidad={data?.nacionalidad}
                birthday={data?.fecha_de_nacimiento}
                createAt={data?.created_at}
                description={data?.descripcion}
              />
            </div>
            <div className="col-span-9 h-full rounded-xl bg-white shadow-lg w-full p-10">
              {selectedOption === "misLibros" && (
                <div>
                  <div className="flex flex-col">
                    <span className="text-xl font-semibold">
                      Ultimos libros de {data?.nombre || data?.username}
                    </span>
                    <span className="text-textColorGray text-sm">
                      {cantLibros} libros publicados
                    </span>
                    <div className="flex flex-col gap-y-3 mt-3">
                      {allLibros?.map((lectura) => (
                        <MyBooksContainer
                          key={lectura.id}
                          libroData={lectura}
                          canEdit={usernameLs === data?.username}
                        />
                      ))}
                      <div className="flex justify-center w-full mt-10">
                        {librosLoading ? <Spinner /> : !libroLastPage &&
                          <IconButton
                            onClick={handleLibrosNextPage}
                          >
                            <FaArrowDown />
                          </IconButton>
                        }
                      </div>
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
                      {allLecturas?.map((lectura) => (
                        <SearchItem key={lectura?.id} book={lectura} />
                      ))}
                    </div>
                    <div className="flex justify-center w-full mt-10">
                      {lecturasLoading ? <Spinner /> : !lecturaLastPage &&
                        <IconButton
                          onClick={handleLecturasNextPage}
                        >
                          <FaArrowDown />
                        </IconButton>
                      }
                    </div>
                  </div>
                </div>


              )}
              {selectedOption === "seguidos" && (
                <div>
                  <div className="grid grid-cols-12 gap-x-20 gap-y-10">
                    {!allFOllowed.length &&
                      <div className="col-span-12 flex flex-col justify-center text-center">
                        <Typography variant="h4">Aún no sigues a nadie</Typography>
                        <Typography variant="h4">¡Lee libros y conoce a tus autores favoritos!</Typography>
                      </div>
                    }
                    {
                      allFOllowed?.map(followed => (
                        <div className="col-span-12 _md:col-span-6" key={followed?.id}>
                          <UserCard
                            username={followed?.username ?? "Nombre de Usuario no encotrado"}
                            nombre={followed?.nombre ?? "Nombre no encontrado"}
                            image={followed?.profile}
                            description={followed?.descripcion ?? ""}
                            buttonProps={followed?.seguidor ?
                              {
                                info: <span className="flex items-center">
                                  <SlUserUnfollow className="inline-block align-middle mr-1  _md:w-4 _md:h-4" />
                                  Dejar de seguir
                                </span>,
                                onClick: () => handleUnfollow(followed?.id)
                              }
                              :
                              {
                                info: <>
                                  <span className="flex items-center">
                                    <SlUserFollow className="inline-block align-middle mr-1  _md:w-4 _md:h-4" />
                                    Seguir
                                  </span>
                                </>,
                                onClick: () => handleFollow(followed?.id)
                              }
                            }
                          />
                        </div>))
                    }


                  </div>
                  <div className="flex justify-center w-full mt-10">
                    {followedLoading ? <Spinner /> : !followedLastPage &&
                      <IconButton
                        onClick={handleFollowedNextPage}
                      >
                        <FaArrowDown />
                      </IconButton>
                    }
                  </div>
                </div>
              )}
              {selectedOption === "seguidores" &&
                <div>
                  <div className="grid grid-cols-12 gap-x-20 gap-y-10">
                    {!allFollowers.length &&
                      <div className="col-span-12 flex flex-col justify-center text-center">
                        <Typography variant="h4">Aún no tienes seguidores</Typography>
                        <Typography variant="h4">¡Escribe para que te conozcan!</Typography>
                      </div>
                    }
                    {
                      allFollowers?.map(follower => (
                        <div className="col-span-12 _md:col-span-6" key={follower?.id}>
                          <UserCard
                            username={follower?.username ?? "Nombre de Usuario no encotrado"}
                            nombre={follower?.nombre ?? "Nombre no encontrado"}
                            image={follower?.profile}
                            description={follower?.descripcion ?? ""}
                            canDelete={usernameLs === data?.username}
                            deleteButtonProps={
                              {
                                deleteInfo: <span className="flex items-center">
                                  <AiOutlineUserDelete />
                                </span>,
                                onDelete: () => handleDeleteFollower(follower?.id)
                              }
                            }
                            buttonProps={follower?.seguidor ?
                              {
                                info: <span className="flex items-center">
                                  <SlUserUnfollow className="inline-block align-middle mr-1  _md:w-4 _md:h-4" />
                                  Dejar de seguir
                                </span>,
                                onClick: () => handleUnfollow(follower?.id)
                              }
                              :
                              {
                                info: <>
                                  <span className="flex items-center">
                                    <SlUserFollow className="inline-block align-middle mr-1  _md:w-4 _md:h-4" />
                                    Seguir
                                  </span>
                                </>,
                                onClick: () => handleFollow(follower?.id)
                              }
                            }
                          />
                        </div>))
                    }


                  </div>
                  <div className="flex justify-center w-full mt-10">
                    {followersLoading ? <Spinner /> : !followersLastPage &&
                      <IconButton
                        onClick={handleFollowersNextPage}
                      >
                        <FaArrowDown />
                      </IconButton>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
