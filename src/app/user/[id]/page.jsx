"use client";

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
import useUserInfo from "@/hooks/useUser";
import { Button } from "@material-tailwind/react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPersonFillGear } from "react-icons/bs";
import { CiCamera } from "react-icons/ci";
import toast from "react-hot-toast";

const defaultValues = {
  username: "",
  fecha_nacimiento: null,
};

const page = ({ params }) => {
  const { refresh } = useUser();
  const { getUserInformation, data } = useUserInfo();
  const {
    getFollowFollowers,
    data: seguidoresSeguidos,
    loading,
  } = useUserInfo();
  const { getUserLecturas, data: lecturas } = useUserInfo();
  const {
    updateUserInformation,
    data: informacion,
    isError,
    isTrue,
    message,
  } = useUserInfo();
  const { getAllBooks } = useBook();
  const [selectedOption, setSelectedOption] = useState("misLibros");
  const [arrBooks, setArrBooks] = useState([]);
  const [usernameLs, setUsernmeLs] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [changeImage, setChangeImage] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [isDeleteProfile, setIsDeleteProfile] = useState(false);
  const [isNotDisable, setIsNotDisable] = useState(true);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
    watch,
  } = useForm({ defaultValues });

  const onSubmit = async (formData) => {
    updateUserInformation(formData);
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    getUserInformation(params.id);
  }, []);

  useEffect(() => {
    getUserInformation(params.id);
  }, [informacion]);

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

  useEffect(() => {
    if (!isDeleteProfile) return;
    setIsNotDisable(false);
    setProfileImage(null);
    setFileInputKey(Date.now());
  }, [isDeleteProfile]);

  useEffect(() => {
    if (!data) return;
    getFollowFollowers(data?.id);
    getUserLecturas(1, data?.id);
    getAllUserBooks(data?.id);
    setProfileImage(data?.profile);
    setUsernmeLs(localStorage.getItem("username"));
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

  const isMyBook = useMemo(() => {
    return usernameLs !== data?.username;
  });

  const handleEditChange = () => {
    setIsEdit(!isEdit);
    reset({
      nombre: data?.nombre,
      direccion: data?.direccion,
      nacionalidad: data?.nacionalidad,
      fecha_nacimiento: data?.fecha_de_nacimiento,
      descripcion: data?.descripcion,
    });
  };

  const handleImageChange = (event) => {
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
      setChangeImage(true);
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
      setIsNotDisable(false);
    }
  };

  const handleDeleteProfile = () => {
    setFileInputKey(Date.now());
    setIsDeleteProfile(true);
    setChangeImage(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-100">
          {isEdit && (
            <div className="w-4/6 mx-auto flex justify-between items-center py-2">
              <div>Estas editando tu perfil ahora</div>
              <div className="flex gap-2">
                <Button
                  className="px-2 py-2 flex text-black border border-colorPrimario bg-white hover:bg-colorHoverPrimario hover:text-white"
                  onClick={handleSubmit(onSubmit)}
                >
                  <span className="flex items-center">Guardar Cambios</span>
                </Button>
                <Button
                  className="px-2 py-2 flex text-black border border-textColorGray bg-white hover:bg-textHeaderColorGray hover:text-white"
                  onClick={handleEditChange}
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
                    backgroundImage: data?.portada
                      ? `url(${data?.portada})`
                      : "linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent)",
                  }}
                >
                  <div>
                    <label htmlFor="profile-input" className="cursor-pointer">
                      <div className="inline-block">
                        <span className="rounded-lg mt-2 ml-2 px-2 py-2 flex items-center gap-1 text-black border border-colorPrimario bg-white hover:bg-colorHoverPrimario hover:text-white">
                          <CiCamera size={18} />
                          <span>Actualizar foto de portada</span>
                        </span>
                      </div>
                    </label>
                    <input
                      type="file"
                      id="profile-input"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  <div
                    className={`flex justify-center items-center h-full  ${
                      isDeleteProfile && "mb-11"
                    }`}
                  >
                    <ProfileImageUploader
                      username={data?.username}
                      profileImage={profileImage}
                      handleImageChange={handleImageChange}
                      handleDeleteProfile={handleDeleteProfile}
                      isDeleteProfile={isDeleteProfile}
                      setProfileImage={setProfileImage}
                      key={fileInputKey}
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
                    <div className="flex items-center gap-x-1">
                      {" "}
                      <BsPersonFillGear size={18} />
                      <span>Editar Perfil</span>
                    </div>
                  ),
                  onClick: handleEditChange,
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
              isFollow={false}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
              username={data?.username}
            />
          </div>

          <div className="flex mx-auto w-5/6 mt-4 gap-x-4">
            <div className={`${isEdit ? "hidden" : "block"}`}>
              <ProfileInfoCard
                direction={data?.direccion}
                nacionalidad={data?.nacionalidad}
                birthday={data?.fecha_de_nacimiento}
                createAt={data?.created_at}
                description={data?.descripcion}
              />
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
                    label={"Direccion"}
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
            <div
              className={`${
                isEdit ? "hidden" : "block"
              } flex flex-col w-full h-full rounded-xl p-6 bg-white shadow-lg ml-10`}
            >
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
                      {!isMyBook
                        ? arrBooks?.data?.map((lectura) => (
                            <MyBooksContainer
                              key={lectura.id}
                              libroData={lectura}
                            />
                          ))
                        : arrBooks?.data?.map((lectura) => (
                            <SearchItem key={lectura?.id} book={lectura} />
                          ))}
                      {}
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
              {selectedOption === "seguidos" && (
                <p className="grid grid-col grid-cols-4 gap-2">
                  <UserCard
                    username={data?.username}
                    nombre={data?.nombre}
                    image={data?.profile}
                    description={data?.descripcion}
                    buttonProps={{ info: "seguir", onClick: handleEditChange }}
                  />
                  <UserCard
                    username={data?.username}
                    nombre={data?.nombre}
                    image={data?.profile}
                    description={data?.descripcion}
                    buttonProps={{ info: "seguir", onClick: handleEditChange }}
                  />
                  <UserCard
                    username={data?.username}
                    nombre={data?.nombre}
                    image={data?.profile}
                    description={data?.descripcion}
                    buttonProps={{ info: "seguir", onClick: handleEditChange }}
                  />
                  <UserCard
                    username={data?.username}
                    nombre={data?.nombre}
                    image={data?.profile}
                    description={data?.descripcion}
                    buttonProps={{ info: "seguir", onClick: handleEditChange }}
                  />
                  <UserCard
                    username={data?.username}
                    nombre={data?.nombre}
                    image={data?.profile}
                    description={data?.descripcion}
                    buttonProps={{ info: "seguir", onClick: handleEditChange }}
                  />
                </p>
              )}
              {selectedOption === "seguidores" && (
                <p className="grid grid-col grid-cols-4 gap-2">
                  <UserCard
                    username={data?.username}
                    nombre={data?.nombre}
                    image={data?.profile}
                    description={data?.descripcion}
                    buttonProps={{ info: "seguir", onClick: handleEditChange }}
                  />
                  <UserCard
                    username={data?.username}
                    nombre={data?.nombre}
                    image={data?.profile}
                    description={data?.descripcion}
                    buttonProps={{ info: "seguir", onClick: handleEditChange }}
                  />
                  <UserCard
                    username={data?.username}
                    nombre={data?.nombre}
                    image={data?.profile}
                    description={data?.descripcion}
                    buttonProps={{ info: "seguir", onClick: handleEditChange }}
                  />
                  <UserCard
                    username={data?.username}
                    nombre={data?.nombre}
                    image={data?.profile}
                    description={data?.descripcion}
                    buttonProps={{ info: "seguir", onClick: handleEditChange }}
                  />
                  <UserCard
                    username={data?.username}
                    nombre={data?.nombre}
                    image={data?.profile}
                    description={data?.descripcion}
                    buttonProps={{
                      info: "eliminar",
                      onClick: handleEditChange,
                    }}
                  />
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
