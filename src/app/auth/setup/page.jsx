"use client";
import InputField from "@/components/common/InputField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";
import useUserInfo from "@/hooks/useUser";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiUpload } from "react-icons/fi";
import { Tooltip } from "@material-tailwind/react";
import { HiXMark } from "react-icons/hi2";
import { SlPicture } from "react-icons/sl";
import { TbCameraPlus } from "react-icons/tb";

const defaultValues = {
  direccion: "",
  descripcion: "",
  nacionalidad: "",
  nombre: "",
};

export default function SetUp() {
  const [isFocused, setIsFocused] = useState(false);
  const [image, setImage] = useState({});
  const [cover, setCover] = useState({});
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm({ defaultValues });
  const {
    updateUserInformation2,
    updateProfile,
    updatePortada,
    isError,
    loading,
  } = useUserInfo();

  // Pasar de pagina
  const handleNext = () => {
    setPage(page + 1);
  };

  const handleBack = () => {
    setPage(page - 1);
  };

  const handleSkipAll = () => {
    setPage(4);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Imagenes
  const handleAddImage = async (file) => {
    setImage({ current: "", preview: URL.createObjectURL(file), file });
  };

  const handleRemoveImage = async () => {
    setImage({});
  };

  const handleAddCover = async (file) => {
    setCover({ preview: URL.createObjectURL(file), file });
  };

  const handleRemoveCover = async () => {
    setCover({});
  };

  const onSubmit = async (formData) => {
    // Si todos los campos estan vacios pasamos de pagina
    if (
      !formData.nombre &&
      !formData.direccion &&
      !formData.descripcion &&
      !formData.nacionalidad
    ) {
      handleNext();
      return;
    }

    await updateUserInformation2(formData);

    if (!isError) {
      // Limpiamos el formulario
      reset(defaultValues);

      handleNext();
    }

    toast.success("Perfil actualizado correctamente");
  };

  const onUpdateProfile = async () => {
    if (image.preview === undefined) {
      toast.error("Debes subir una imagen de perfil");
      return;
    }

    await updateProfile(image.file);

    if (!isError) {
      // Limpiamos el estado de la imagen
      setImage({});

      handleNext();
    }

    toast.success("Perfil actualizado correctamente");
  };

  const onUpdateCover = async () => {
    if (cover.preview === undefined) {
      toast.error("Debes subir una imagen de portada");
      return;
    }

    await updatePortada(cover.file);

    if (!isError) {
      // Limpiamos el estado de la imagen
      setCover({});

      handleNext();
    }

    toast.success("Perfil actualizado correctamente");
  };

  return (
    <>
      {page === 1 && (
        <>
          <div>
            <Image
              src="/image/img_inicio.png"
              width={400}
              height={200}
              alt="imagen presentacion"
            />
          </div>

          <div className="bg-colorFondo p-3 rounded-2xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[40%] 3xl:max-w-[40%] rounded-xl">
            <span className="flex justify-end">
              <button
                onClick={handleSkipAll}
                className="py-2 px-6 text-white bg-colorPrimario rounded-md flex justify-end"
              >
                Omitir Todo
              </button>
            </span>
            <div className="flex justify-center pt-4 ">
              <Image
                src={"/image/g2.png"}
                alt="imagen logo"
                width={250}
                height={250}
              />
            </div>

            <div className="text-center font-bold text-gray-700 pt-4">
              <p>Para obtener la mejor experiencia ReadMe,</p>
              <p>¡Cuéntanos sobre ti!</p>
            </div>

            <div className="flex flex-col gap-y-5 items-center pt-7 mt-11">
              <InputField
                label={"*Nombre"}
                type={"text"}
                onBlur={handleBlur}
                register={register}
                name={"nombre"}
                required={false}
                className={`bg-white `}
              />

              <InputField
                label={"*Direccion"}
                type={"text"}
                onBlur={handleBlur}
                register={register}
                name={"direccion"}
                required={false}
                className={`bg-white `}
              />

              <InputField
                label={"*Nacionalidad"}
                type={"text"}
                register={register}
                name={"nacionalidad"}
                required={false}
                className={`bg-white `}
              />

              <div className="w-72">
                <div className="relative w-full min-w-[200px]">
                  <textarea
                    className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-dark outline outline-0 transition-all placeholder-shown:border bg-white placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    rows="4"
                    {...register("descripcion")}
                    onBlur={handleBlur}
                  ></textarea>
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    *Descripción
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-14">
              <button
                onClick={handleNext}
                className="py-2 px-6 mx-6 mb-4 lg:mb-0 text-white bg-colorPrimario rounded-md "
              >
                Saltar este paso
              </button>

              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="py-2 px-3 mx-6 text-white bg-colorPrimario rounded-md "
                disabled={loading}
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}

      {page === 2 && (
        <>
          <div>
            <Image
              src="/image/img_inicio.png"
              width={400}
              height={200}
              alt="imagen presentacion"
            />
          </div>

          <div className="bg-colorFondo p-3 rounded-2xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[40%] 3xl:max-w-[40%] rounded-xl">
            <span className="flex justify-between">
              <button onClick={handleBack}>
                <IoMdArrowRoundBack size={40} />
              </button>

              <button
                onClick={handleSkipAll}
                className="py-2 px-6 text-white bg-colorPrimario rounded-md flex justify-end"
              >
                Omitir Todo
              </button>
            </span>
            <div className="flex justify-center pt-4 ">
              <Image
                src={"/image/g2.png"}
                alt="imagen logo"
                width={250}
                height={250}
              />
            </div>

            <div className="text-center font-bold text-xl text-gray-700 pt-4">
              <p>Elije una foto de perfil.</p>
            </div>

            <div className="text-center font-bold text-gray-700 pt-4">
              <p>¿Tienes una selfie favorita? Súbela aquí.</p>
            </div>

            <div className="flex flex-col items-center relative mt-10">
              <div className="group relative">
                {image.preview ? (
                  <div>
                    <img
                      className="w-72 rounded-full"
                      src={image.preview}
                      alt="Profile Preview"
                      style={{ height: "300px" }}
                    />
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden cursor-pointer"
                      multiple={false}
                      onChange={(event) => {
                        event.target.blur();
                        handleAddImage(event.target.files[0]);
                      }}
                    />
                    <Tooltip content="Subir Imagen" placement="top">
                      <span>
                        <CgProfile size={300} color="gray" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FiUpload size={60} color="black" />
                        </div>
                      </span>
                    </Tooltip>
                  </label>
                )}
                {image.preview && (
                  <Tooltip content="Eliminar Imagen">
                    <div
                      className="absolute -top-1 -right-1 bg-colorPrimario text-white w-8 h-8 group-hover:flex justify-center items-center rounded-full cursor-pointer"
                      onClick={handleRemoveImage}
                    >
                      <HiXMark size={32} />
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-14">
              <button
                onClick={handleNext}
                className="py-2 px-6 mx-6 mb-4 lg:mb-0 text-white bg-colorPrimario rounded-md "
              >
                Saltar este paso
              </button>

              <button
                type="submit"
                onClick={onUpdateProfile}
                className="py-2 px-3 mx-6 text-white bg-colorPrimario rounded-md "
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}

      {page === 3 && (
        <>
          <div>
            <Image
              src="/image/img_inicio.png"
              width={400}
              height={400}
              alt="imagen presentacion"
            />
          </div>

          <div className="bg-colorFondo p-3 rounded-2xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[40%] 3xl:max-w-[40%] rounded-xl">
            <span className="flex justify-between">
              <button onClick={handleBack}>
                <IoMdArrowRoundBack size={40} />
              </button>

              <button
                onClick={handleSkipAll}
                className="py-2 px-6 text-white bg-colorPrimario rounded-md flex justify-end"
              >
                Omitir Todo
              </button>
            </span>
            <div className="flex justify-center pt-4 ">
              <img
                src={"/image/g2.png"}
                alt="imagen logo"
                width={250}
                height={250}
              />
            </div>

            <div className="text-center font-bold text-xl text-gray-700 pt-4">
              <p>Elige una portada.</p>
            </div>

            <div className="text-center font-bold text-gray-700 pt-4">
              <p>
                Las personas que visiten tu perfil lo verán. Muestra tu estilo.
              </p>
            </div>

            <div className="flex flex-col items-center relative mt-10">
              {cover.preview ? (
                <div>
                  <img
                    src={cover.preview}
                    alt="Cover Preview"
                    className="w-full rounded-lg"
                    style={{ height: "300px" }}
                  />
                </div>
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden cursor-pointer"
                    multiple={false}
                    onChange={(event) => {
                      event.target.blur();
                      handleAddCover(event.target.files[0]);
                    }}
                  />
                  <Tooltip content="Subir Imagen" placement="top">
                    <span>
                      <SlPicture color="gray" size={300} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <TbCameraPlus size={60} color="black" />
                      </div>
                    </span>
                  </Tooltip>
                </label>
              )}
              {cover.preview && (
                <Tooltip content="Eliminar Imagen">
                  <div
                    className="absolute -top-10 -right-1 bg-colorPrimario text-white w-8 h-8 group-hover:flex justify-center items-center rounded-full cursor-pointer"
                    onClick={handleRemoveCover}
                  >
                    <HiXMark size={32} />
                  </div>
                </Tooltip>
              )}
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-14">
              <button
                onClick={handleNext}
                className="py-2 px-6 mx-6 text-white bg-colorPrimario rounded-md "
              >
                Saltar este paso
              </button>

              <button
                type="submit"
                onClick={onUpdateCover}
                className="py-2 px-3 mx-6 text-white bg-colorPrimario rounded-md "
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}

      {page === 4 && (
        <>
          <div>
            <Image
              src="/image/img_inicio.png"
              width={400}
              height={200}
              alt="imagen presentacion"
            />
          </div>

          <div className="bg-colorFondo p-3 rounded-2xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[40%] 3xl:max-w-[40%] rounded-xl">
            <span className="flex justify-start">
              <button onClick={handleBack}>
                <IoMdArrowRoundBack size={40} />
              </button>
            </span>
            <div className="flex justify-center pt-4 ">
              <Image
                src={"/image/g2.png"}
                alt="imagen logo"
                width={250}
                height={250}
              />
            </div>

            <div className="h-2/4 mt-36">
              <div className="text-center font-bold text-gray-700 pt-4">
                <p className="text-4xl">
                  ¡Gracias por configurar tu perfil! Un mundo de historias te
                  espera...
                </p>

                <div className="font-bold text-xl pt-4">
                  <p>Haga clic para ir al inicio</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-center mb-40 mt-9">
              <button
                type="submit"
                onClick={() => router.push("/auth/login")}
                className="py-2 px-3 mx-6 text-white bg-colorPrimario rounded-md "
              >
                Finalizar
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
