"use client";

import useUserInfo from "@/hooks/useUser";
import MyBooksContainer from "@/components/books/mybooks/BooksContainer";
import InputField from "@/components/common/InputField";
import Loader from "@/components/common/loader";
import SearchItem from "@/components/search/SearchItem";
import ProfileHeader from "@/components/users/ProfileHeader";
import ProfileImageUploader from "@/components/users/ProfileImage";
import { ProfileInfoCard } from "@/components/users/ProfileInfoCard";
import { UserCard } from "@/components/users/UserCard";
import UserOption from "@/components/users/UserOption";
import { useUser } from "@/contexts/UserProvider";
import useBook from "@/hooks/useBook";
import { IconButton, Spinner, Typography } from "@material-tailwind/react";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import { FaArrowDown } from "react-icons/fa";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { BsPersonFillGear } from "react-icons/bs";
import { CiCamera } from "react-icons/ci";
import toast from "react-hot-toast";
import OptionsUpdate from "@/components/users/OptionsUpdate";
import Link from "next/link";
import NotExist from "@/components/common/NotExist";

const defaultValues = {
  username: "",
  fecha_nacimiento: null,
};

const page = ({ params }) => {
  const { setIsActualizado, setProfileUpdate } = useUser();
  const { getUserInformation, data, isError: userNotFound } = useUserInfo();
  const { getFollowFollowers, data: seguidoresSeguidos } = useUserInfo();
  const {
    getUserLecturas,
    data: lecturas,
    loading: lecturasLoading,
  } = useUserInfo();
  const { deleteFollower } = useUserInfo();
  const { follow } = useUserInfo();
  const { unfollow } = useUserInfo();
  const { getAllBooks, isLoading: librosLoading } = useBook();
  const { updateProfile, data: updProfile } = useUserInfo();
  const { data: dltProfile, deleteProfile } = useUserInfo();
  const { data: updPortada, updatePortada } = useUserInfo();
  const { data: dltPortada, deletePortada } = useUserInfo();

  const {
    updateUserInformation,
    data: informacion,
    isError,
    isTrue,
    message,
    isLoading: userInformationLoading,
  } = useUserInfo();
  const [selectedOption, setSelectedOption] = useState("misLibros");
  const [arrBooks, setArrBooks] = useState([]);
  const [usernameLs, setUsernmeLs] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isNotDisable, setIsNotDisable] = useState(true);

  //imagen
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [profileImage, setProfileImage] = useState(null);
  const [isDeleteProfile, setIsDeleteProfile] = useState(false);
  const [isChangeImage, setIsChangeImage] = useState(false);

  // portada
  const [fileInputPortadaKey, setFileInputPortadaKey] = useState(Date.now());
  const [portadaImage, setPortadaImage] = useState(null);
  const [isPortadaUpdate, setIsPortadaUpdate] = useState(false);
  const [isChangePortada, setIsChangePortada] = useState(false);
  const [isDeletePortada, setIsDeletePortada] = useState(false);

  const {
    getFollowers,
    currentData: pageFollowers,
    loading: followersLoading,
  } = useUserInfo();
  const [allFollowers, setAllFollowers] = useState([]);
  const [followersPage, setFollowersPage] = useState(0);
  const [followersLastPage, setFollowersLastPage] = useState(false);

  const {
    getFollowed,
    currentData: pageFollowed,
    loading: followedLoading,
  } = useUserInfo();
  const [allFollowed, setAllFollowed] = useState([]);
  const [followedPage, setFollowedPage] = useState(0);
  const [followedLastPage, setFollowedLastPage] = useState(false);

  const [allLecturas, setAllLecturas] = useState([]);
  const [lecturaPage, setLecturaPage] = useState(0);
  const [lecturaLastPage, setLecturaLastPage] = useState(false);

  const [allLibros, setAllLibros] = useState([]);
  const [libroPage, setLibroPage] = useState(0);
  const [libroLastPage, setLibroLastPage] = useState(false);
  const [cantLibros, setCantLibros] = useState(0);

  const optionsRef = useRef();

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { isDirty },
    watch,
  } = useForm({ defaultValues });

  const onSubmit = async (formData) => {
    const currentDate = new Date();

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 15);

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 70);

    const fechaNacimiento = new Date(formData.fecha_nacimiento);
    const edad = (currentDate - fechaNacimiento) / (1000 * 60 * 60 * 24 * 365);

    if (edad > 12 && edad <= 120) {
      updateUserInformation(formData);
      if (isChangeImage) {
        updateProfile(profileImage);
      }

      if (isDeleteProfile) {
        deleteProfile();
      }
      if (isChangePortada) {
        updatePortada(portadaImage);
      }
      if (isDeletePortada) {
        deletePortada();
      }
    } else if (edad <= 12) {
      toast.error("Humm, Lo siento! Debes tener al menos 12 años");
      return;
    } else if (edad > 120) {
      toast.error("Humm, lo siento! excedes el limite de edad");
      return;
    }

    setIsActualizado(true);
    setIsEdit(!isEdit);
    setIsPortadaUpdate(false);
  };

  //efects
  useEffect(() => {
    getUserInformation(params.id);
  }, []);

  useEffect(() => {
    setIsNotDisable(false);
  }, [isDirty]);

  const isMyBook = useMemo(() => {
    return usernameLs !== data?.username;
  });

  // actualizar la informacion si algo cambia
  useEffect(() => {
    getUserInformation(params.id);
  }, [informacion, updProfile, dltProfile, updPortada, dltPortada]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isPortadaUpdate &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target)
      ) {
        setIsPortadaUpdate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPortadaUpdate]);

  useEffect(() => {
    setAllFollowers([]);
    setFollowersPage(1);

    setAllFollowed([]);
    setFollowedPage(1);

    setAllLecturas([]);
    setLecturaPage(1);

    setAllLibros([]);
    setLibroPage(1);
    if (!data) return;
    getFollowFollowers(data?.id);
    getUserLecturas(1, data?.id);
    getAllUserBooks(data?.id, 1);
    getFollowers(data?.id, 1);
    getFollowed(data?.id, 1);
    setProfileImage(data?.profile);
    setUsernmeLs(localStorage.getItem("username"));
    setPortadaImage(data?.portada);

    if (data?.username == usernameLs) {
      setProfileUpdate(data?.profile);
      setPortadaImage(data?.portada);
      setIsActualizado(true);
    }
  }, [data]);

  useEffect(() => {
    if (!pageFollowers) return;
    const followers = pageFollowers?.users ?? [];
    setAllFollowers((prevFollowers) => {
      const prevIds = new Set(prevFollowers.map((follower) => follower.id));
      const newFollowers = followers.filter(
        (follower) => !prevIds.has(follower.id)
      );
      return [...prevFollowers, ...newFollowers];
    });
    setFollowersLastPage(followersPage >= pageFollowers.total_pages);
  }, [pageFollowers]);

  useEffect(() => {
    if (!pageFollowed) return;
    const followed = pageFollowed?.users ?? [];
    setAllFollowed((prevFollowed) => {
      const prevIds = new Set(prevFollowed.map((item) => item.id));
      const newFollowed = followed.filter((item) => !prevIds.has(item.id));
      return [...prevFollowed, ...newFollowed];
    });
    setFollowedLastPage(followedPage >= pageFollowed.total_pages);
  }, [pageFollowed]);

  useEffect(() => {
    if (!lecturas) return;
    const findedLecturas = lecturas?.libros ?? [];
    setAllLecturas((prevLecturas) => {
      const prevIds = new Set(prevLecturas.map((lectura) => lectura.id));
      const nuevasLecturas = findedLecturas.filter(
        (lectura) => !prevIds.has(lectura.id)
      );
      return [...prevLecturas, ...nuevasLecturas];
    });
    setLecturaLastPage(lecturaPage >= lecturas.total_pages);
  }, [lecturas]);

  useEffect(() => {
    if (!arrBooks) return;
    const findedLibros = arrBooks?.data ?? [];
    setCantLibros(arrBooks?.total_items ?? 0);
    setAllLibros((prevLibros) => {
      const prevIds = new Set(prevLibros.map((libro) => libro.id));
      const nuevosLibros = findedLibros.filter(
        (libro) => !prevIds.has(libro.id)
      );
      return [...prevLibros, ...nuevosLibros];
    });
    setLibroLastPage(libroPage >= arrBooks.total_pages);
  }, [arrBooks]);

  // si hay algun mensaje lanzo un toast con el mensaje
  useEffect(() => {
    if (isError && !isTrue) {
      toast.error(message);
      return;
    }
    if (isTrue && !isError) {
      toast.success(message);
      return;
    }
  }, [isError, isTrue]);

  // si elimino la foto seteo todo los contenedores relacionados
  useEffect(() => {
    if (!isDeleteProfile) return;
    setIsNotDisable(false);
    setProfileImage(null);
    setFileInputKey(Date.now());
  }, [isDeleteProfile]);

  // si elimino el perfil seteo lo de portada
  useEffect(() => {
    if (!isDeletePortada) return;
    setPortadaImage(null);
    setFileInputPortadaKey(Date.now());
  }, [isDeletePortada]);

  const getAllUserBooks = async (id, page) => {
    const option = {
      page,
      user_id: id,
      cantidad_minima_capitulos: 1
    };
    const bookData = await getAllBooks(option);
    setArrBooks(bookData);
  };

  // funciones

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleFollow = async (id) => {
    try {
      await follow(id);
      getUserInformation(params.id);
    } catch (e) {}
  };

  const handleUnfollow = async (id) => {
    try {
      await unfollow(id);
      getUserInformation(params.id);
    } catch (e) {}
  };

  const handleFollowedNextPage = () => {
    setFollowedPage(followedPage + 1);
    getFollowed(data?.id, followedPage + 1);
  };

  const handleFollowersNextPage = () => {
    setFollowersPage(followersPage + 1);
    getFollowers(data?.id, followersPage + 1);
  };

  const handleLecturasNextPage = () => {
    setLecturaPage((prevPage) => prevPage + 1);
    getUserLecturas(lecturaPage + 1, data?.id);
  };

  const handleLibrosNextPage = () => {
    setLibroPage((prevPage) => prevPage + 1);
    getAllUserBooks(data?.id, libroPage + 1);
  };

  const handleDeleteFollower = async (id) => {
    try {
      await deleteFollower(id);
      getUserInformation(params.id);
    } catch (e) {}
  };

  const handleEditCancel = () => {
    setPortadaImage(data?.portada);
    setProfileImage(data?.profile);
    setIsPortadaUpdate(false);
    reset({
      nombre: data?.nombre,
      direccion: data?.direccion,
      nacionalidad: data?.nacionalidad,
      fecha_nacimiento: data?.fecha_de_nacimiento,
      descripcion: data?.descripcion,
    });
    setIsEdit(!isEdit);
    setIsNotDisable(true);
  };

  const handleImageChange = (event) => {
    setIsChangeImage(true);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

      if (
        fileExtension !== "png" &&
        fileExtension !== "jpg" &&
        fileExtension !== "jpeg"
      ) {
        toast.error("Solo se permiten archivos PNG, JPG o JPEG.");
        return;
      }
      const reader = new FileReader();
      setIsDeleteProfile(false);
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
      setIsNotDisable(false);
    }
  };

  const handlePortadaChange = (event) => {
    setIsChangePortada(true);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

      if (
        fileExtension !== "png" &&
        fileExtension !== "jpg" &&
        fileExtension !== "jpeg"
      ) {
        toast.error("Solo se permiten archivos PNG, JPG o JPEG.");
        return;
      }
      const reader = new FileReader();

      reader.onload = (e) => {
        setPortadaImage(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
      setIsNotDisable(false);
      setIsPortadaUpdate(false);
    }
  };

  const handleDeleteProfile = () => {
    setFileInputKey(Date.now());
    setIsDeleteProfile(true);
    setIsChangeImage(false);
  };

  const handleDeletePortada = () => {
    setIsDeletePortada(true);
    setFileInputPortadaKey(Date.now());
    setIsPortadaUpdate(!isPortadaUpdate);
    setIsNotDisable(false);
    setPortadaImage(null);
  };

  const handleUpdate = () => {
    setIsPortadaUpdate((prevState) => !prevState);
  };
  
  if(userNotFound)
    return <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-background text-center">
        <NotExist message={"Lo sentimos, no hemos encontrado el usuario"} butMessage={""}/>
    </div>

  return (
    <>
      {!data && arrBooks ? (
        <Loader />
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-background ">
          {isEdit && (
            <div className="w-4/6 mx-auto flex justify-between items-center py-2">
              <div>Estas editando tu perfil ahora</div>
              <div className="flex gap-2 ">
                <Button
                  className="px-2 py-2 flex text-black border border-colorPrimario bg-white hover:bg-colorHoverPrimario hover:text-white dark:border-dark-darkColorButtons dark:bg-dark-darkColorButtons dark:hover:bg-dark-darkColorHover dark:disabled:bg-dark-darkColorDisabled"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isNotDisable}
                >
                  <span className="flex items-center ">Guardar Cambios</span>
                </Button>
                <Button
                  className="px-2 py-2 flex text-black border border-textColorGray bg-white hover:bg-textHeaderColorGray hover:text-white dark:border-dark-darkColorButtons dark:bg-dark-darkColorButtons dark:hover:bg-dark-darkColorHover"
                  onClick={handleEditCancel}
                >
                  <span className="flex items-center">Cancelar</span>
                </Button>
              </div>
            </div>
          )}
          <div>
            {isEdit ? (
              <div
                className={`${
                  isEdit ? "opacity-100" : "opacity-0"
                } flex flex-col justify-center items-center transition-all duration-200 transform`}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: portadaImage
                      ? `url(${portadaImage})`
                      : "linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent)",
                  }}
                >
                  <div>
                    <div className="inline-block">
                      <Button
                        onClick={handleUpdate}
                        className="rounded-lg mt-2 ml-2 px-2 py-2 flex items-center gap-1 text-black border border-colorPrimario bg-white hover:bg-colorHoverPrimario hover:text-white dark:border-dark-darkColorButtons dark:bg-dark-darkColorButtons"
                      >
                        <CiCamera size={18} />
                        <span>Editar foto de portada</span>
                      </Button>
                    </div>
                  </div>
                  {isPortadaUpdate && (
                    <div ref={optionsRef}>
                      <OptionsUpdate
                        handleUpdate={handlePortadaChange}
                        handleDelete={handleDeletePortada}
                        portada={portadaImage}
                        fileInputPortadaKey={fileInputPortadaKey}
                      />
                    </div>
                  )}

                  <div
                    className={`flex justify-center items-center h-full  ${
                      isDeleteProfile && "mb-11"
                    }
                    
                    ${!profileImage && "mb-11"}
                    `}
                  >
                    <ProfileImageUploader
                      username={data?.username}
                      profileImage={profileImage}
                      handleImageChange={handleImageChange}
                      handleDeleteProfile={handleDeleteProfile}
                      isDeleteProfile={isDeleteProfile}
                      setProfileImage={setProfileImage}
                      fileInputKey={fileInputKey}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <ProfileHeader
                name={data?.nombre}
                username={data?.username}
                profile={data?.profile}
                portada={data?.portada}
                followers={seguidoresSeguidos?.seguidores}
                follows={seguidoresSeguidos?.seguidos}
                read={lecturas?.total_items}
                buttonProps={{
                  info: (
                    <div className="flex items-center gap-x-1 ">
                      {" "}
                      <BsPersonFillGear size={18} />
                      <span>Editar Perfil</span>
                    </div>
                  ),
                  onClick: handleEditCancel,
                }}
              />
            )}
          </div>

          <div
            className={`bg-white ${
              isEdit ? "pointer-events-none opacity-50" : ""
            }`}
          >
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

          {/**Container information */}
          <div className="flex flex-col _lg:flex-row justify-between mx-auto w-auto _lg:w-5/6 mt-4 gap-x-4">
            <div className={`${isEdit ? "hidden" : "block"} _lg:w-1/4 w-1/6`}>
              <ProfileInfoCard
                direction={data?.direccion}
                nacionalidad={data?.nacionalidad}
                birthday={data?.fecha_de_nacimiento}
                createAt={data?.created_at}
                description={data?.descripcion}
              />
            </div>

            {/**Container datos */}
            <div
              className={`${
                isEdit ? "hidden" : "block"
              } flex flex-col mx-auto h-full rounded-xl _lg:p-6 bg-white shadow-lg _lg:w-full w-full lg:pl-4 dark:bg-dark-darkColorNeutral`}
            >
              {selectedOption === "misLibros" && (
                <div>
                  <div className="flex flex-col">
                    {!allLibros.length ? (
                      <div className="col-span-12 flex flex-col justify-center text-center">
                        <Typography variant="h4">
                          {!isMyBook
                            ? "Aun no tienes libros"
                            : "Este usuario no tiene libros"}
                        </Typography>
                        {!isMyBook && (
                          <Typography variant="h4">
                            ¡Comienza ya a escribir tus libros!
                          </Typography>
                        )}
                      </div>
                    ) : (
                      <>
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
                            {librosLoading ? (
                              <Spinner />
                            ) : (
                              !libroLastPage && (
                                <IconButton onClick={handleLibrosNextPage}>
                                  <FaArrowDown />
                                </IconButton>
                              )
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {selectedOption === "listaLectura" && (
                <div>
                  <div className="flex flex-col">
                    {!allLecturas.length ? (
                      <div className="col-span-12 flex flex-col justify-center text-center">
                        <Typography variant="h4">
                          {!isMyBook
                            ? "Aun no tienes lecturas"
                            : "Este usuario no tiene lecturas"}
                        </Typography>
                        {!isMyBook && (
                          <Typography variant="h4">
                            ¡Lee libros y conoce a tus autores favoritos!
                          </Typography>
                        )}
                      </div>
                    ) : (
                      <>
                        <span className="text-xl font-semibold">
                          Lista de lectura de {data?.nombre || data?.username}
                        </span>
                        <span className="text-textColorGray text-sm">
                          {lecturas?.total_items} libros leidos
                        </span>
                      </>
                    )}
                    <div className="flex flex-col gap-y-5 mt-3">
                      {allLecturas?.map((lectura) => (
                        <SearchItem key={lectura?.id} book={lectura} />
                      ))}
                    </div>
                    <div className="flex justify-center w-full mt-10">
                      {lecturasLoading ? (
                        <Spinner />
                      ) : (
                        !lecturaLastPage && (
                          <IconButton onClick={handleLecturasNextPage}>
                            <FaArrowDown />
                          </IconButton>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
              {selectedOption === "seguidos" && (
                <div>
                  <div className="grid grid-col _lg:grid-cols-4 grid-cols-2 gap-2">
                    {!followedLoading && !allFollowed.length && (
                      <div className="col-span-12 flex flex-col justify-center text-center">
                        <Typography variant="h4">
                          Aún no sigues a nadie
                        </Typography>
                        <Typography variant="h4">
                          ¡Lee libros y conoce a tus autores favoritos!
                        </Typography>
                      </div>
                    )}
                    {allFollowed?.map((followed) => (
                      <div
                        className="grid grid-col _lg:grid-cols-4 grid-cols-1 _lg:gap-2"
                        key={followed?.id}
                      >
                        <UserCard
                          username={followed?.username ?? followed?.nombre}
                          nombre={followed?.nombre ?? followed?.username}
                          image={followed?.profile}
                          description={followed?.descripcion ?? ""}
                          buttonProps={
                            followed?.seguidor
                              ? {
                                  info: (
                                    <span className="flex items-center">
                                      <SlUserUnfollow className="inline-block align-middle mr-1  _md:w-4 _md:h-4" />
                                      Dejar de seguir
                                    </span>
                                  ),
                                  onClick: () => handleUnfollow(followed?.id),
                                }
                              : {
                                  info: (
                                    <>
                                      <span className="flex items-center">
                                        <SlUserFollow className="inline-block align-middle mr-1  _md:w-4 _md:h-4" />
                                        Seguir
                                      </span>
                                    </>
                                  ),
                                  onClick: () => handleFollow(followed?.id),
                                }
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center w-full mt-10">
                    {followedLoading ? (
                      <Spinner />
                    ) : (
                      !followedLastPage && (
                        <IconButton onClick={handleFollowedNextPage}>
                          <FaArrowDown />
                        </IconButton>
                      )
                    )}
                  </div>
                </div>
              )}
              {selectedOption === "seguidores" && (
                <div>
                  <div className="grid grid-col grid-cols-4 gap-1">
                    {!allFollowers.length && (
                      <div className="col-span-12 flex flex-col justify-center text-center">
                        <Typography variant="h4">
                          {!isMyBook
                            ? "Aun no tienes seguidores"
                            : "Este usuario no tiene seguidores"}
                        </Typography>
                        <Typography variant="h4">
                          {!isMyBook && " ¡Escribe para que te conozcan!"}
                        </Typography>
                      </div>
                    )}
                    {allFollowers?.map((follower) => (
                      <div key={follower?.id}>
                        <UserCard
                          username={
                            follower?.username ??
                            "Nombre de Usuario no encotrado"
                          }
                          nombre={follower?.nombre ?? follower?.username}
                          image={follower?.profile}
                          description={follower?.descripcion ?? ""}
                          canDelete={usernameLs === data?.username}
                          deleteButtonProps={{
                            deleteInfo: (
                              <span className="flex items-center">
                                <AiOutlineUserDelete />
                              </span>
                            ),
                            onDelete: () => handleDeleteFollower(follower?.id),
                          }}
                          buttonProps={
                            follower?.seguidor
                              ? {
                                  info: (
                                    <span className="flex items-center">
                                      <SlUserUnfollow className="inline-block align-middle mr-1  _md:w-4 _md:h-4" />
                                      Dejar de seguir
                                    </span>
                                  ),
                                  onClick: () => handleUnfollow(follower?.id),
                                }
                              : {
                                  info: (
                                    <>
                                      <span className="flex items-center">
                                        <SlUserFollow className="inline-block align-middle mr-1  _md:w-4 _md:h-4" />
                                        Seguir
                                      </span>
                                    </>
                                  ),
                                  onClick: () => handleFollow(follower?.id),
                                }
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center w-full mt-10">
                    {followersLoading ? (
                      <Spinner />
                    ) : (
                      !followersLastPage && (
                        <IconButton onClick={handleFollowersNextPage}>
                          <FaArrowDown />
                        </IconButton>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {isEdit && (
            <div className="flex flex-col w-1/2 mx-auto items-center justify-center min-h-full rounded-lg p-6 bg-white shadow-lg gap-y-4">
              <span className="w-4/6 mx-auto text-sm mb-4">
                La información que introduzcas aquí, incluyendo tu nombre de
                usuario, foto de perfil e imagen de fondo, serán visibles a
                otros usuarios. Ten cuidado al momento de publicar información
                valiosa.
              </span>
              <div>
                <InputField
                  label={"Nombre"}
                  type={"text"}
                  onBlur={() => trigger("nombre")}
                  register={register}
                  name={"nombre"}
                  required={false}
                />
              </div>
              <div>
                <InputField
                  label={"Dirección"}
                  type={"text"}
                  onBlur={() => trigger("direccion")}
                  register={register}
                  name={"direccion"}
                  required={false}
                />
              </div>
              <div>
                <InputField
                  label={"Nacionalidad"}
                  type={"text"}
                  onBlur={() => trigger("nacionalidad")}
                  register={register}
                  name={"nacionalidad"}
                  required={false}
                />
              </div>
              <div>
                <InputField
                  label={"Fecha de nacimiento"}
                  type={"date"}
                  onBlur={() => trigger("fecha_nacimiento")}
                  register={register}
                  name={"fecha_nacimiento"}
                  required={true}
                />
              </div>

              <div className="w-72">
                <div className="relative w-full min-w-[200px]">
                  <textarea
                    className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    id="descripcion"
                    rows="4"
                    {...register("descripcion")}
                    onBlur={() => trigger("descripcion")}
                  ></textarea>
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Descripción
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default page;
