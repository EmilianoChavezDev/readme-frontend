"use client";

import Loader from "@/components/common/loader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/common/InputField";
import useUserInfo from "@/hooks/useUser";
import { useUser } from "@/contexts/UserProvider";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AccordionField from "@/components/accounts/Accordion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { VscChevronRight } from "react-icons/vsc";
import ProfileView from "@/components/common/ProfileView";

const defaultValues = {
  username: "",
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
  fecha_nacimiento: null,
};

const page = ({ params }) => {
  const {
    getUserInformation,
    data,
    loading,
    updateUsername,
    currentData,
    updatePassword,
    isError,
    isTrue,
    message,
  } = useUserInfo();
  const router = useRouter();
  const { refresh, setProfileUpdate } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isNotDisable, setIsNotDisable] = useState(true);
  const [isRefresh, setIsRefresh] = useState(true);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues,
  });

  // trae la informacion del usuario
  useEffect(() => {
    if (!params.id) return;
    getUserInformation(params?.id);
  }, [params.id]);

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
    setIsNotDisable(false);
  }, [isDirty]);

  // si se efectuan cambios cambiar todo el entorno de la pagina con la informacion nueva
  useEffect(() => {
    if (!currentData || !isRefresh) return;
    refresh(currentData);
  }, [currentData, isRefresh]);

  // traer los datos del usuario
  useEffect(() => {
    if (!data) return;
    setProfileUpdate(data?.profile);
    reset({
      username: data?.username,
      fecha_nacimiento:
        currentData?.fecha_de_nacimiento || data?.fecha_de_nacimiento,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setIsNotDisable(true);
  }, [data]);

  useEffect(() => {
    if (!currentData) return;
    reset({
      username: currentData?.username,
      fecha_nacimiento: currentData?.fecha_de_nacimiento,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setIsNotDisable(true);
  }, [currentData]);

  const onSubmit = (formData) => {
    const whitespaceRegex = /\s/;

    // Validar que el nombre de usuario esté en minúsculas
    if (formData.username !== formData.username.toLowerCase()) {
      toast.error("El nombre de usuario debe estar en minúsculas.");
      resetForm();
      return;
    }

    if (!whitespaceRegex.test(formData.username)) {
      if (
        formData.username !== data?.username ||
        (formData.newPassword && formData.confirmNewPassword !== "")
      ) {
        updateUsername(formData.username, formData.oldPassword);
        resetForm();
      } else {
        toast.error("No se ha encontrado cambios!");
        resetForm();
        return;
      }
    }

    if (formData.newPassword && formData.confirmNewPassword != "") {
      if (
        formData.newPassword &&
        formData.confirmNewPassword !== formData.oldPassword
      ) {
        if (
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.newPassword) &&
          !whitespaceRegex.test(formData.newPassword)
        ) {
          updatePassword(
            formData.oldPassword,
            formData.newPassword,
            formData.confirmNewPassword
          );
          resetForm();
        } else {
          toast.error(
            "La nueva contraseña debe tener al menos 8 caracteres, al menos un número y no puede contener espacios."
          );
          resetForm();
          return;
        }
      } else {
        toast.error("Las contraseñas no coinciden");
        resetForm();
        return;
      }
    } else {
      toast.error("No puedes poner la misma contraseña");
      resetForm();
      return;
    }

    setIsRefresh(true);
    resetForm();
    setIsNotDisable(true);
  };

  const resetForm = () => {
    reset({
      username: data?.username,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      fecha_nacimiento: data?.fecha_de_nacimiento,
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col _md:w-5/6 mx-auto w-full _md:py-9">
            <div className="flex flex-col gap-y-2 items-center justify-center _md:items-start">
              <div className="flex gap-2 items-center mt-4 _sm:mt-0">
                <Link href="/accounts" className="font-semibold text-gray-800">
                  Cuenta
                </Link>
                <span>
                  <VscChevronRight />
                </span>
                <span className="font-semibold text-gray-800">
                  Información Personal
                </span>
              </div>
              <h1 className="text-textHeaderColorGray text-2xl font-bold text-nowrap ">
                Editar Perfil
              </h1>
            </div>

            <div className="flex flex-col mx-40">
              <div
                className="flex _md:mx-auto w-full  _sm:mt-0 _md:justify-between _sm:items-center
            mt-8 flex-col _lg:flex-row
            "
              >
                <div className="flex flex-col">
                  <div className="flex flex-col _md:mt-10 items-center">
                    <ProfileView
                      username={params.id}
                      imagen={data?.profile}
                      size={64}
                    />
                    <div className=" flex flex-col _md:flex-row mt-2 mb-4 text-center text-colorPrimario font-semibold">
                      <span className="font-normal text-nowrap mr-1">
                        Nombre de usuario:
                      </span>
                      <span>{params.id}</span>
                    </div>
                  </div>
                </div>
                <div className="flex _sm:mt-0 flex-col items-center _lg:justify-start _sm:items-start _md:gap-y-8 gap-y-4">
                  <div>
                    <InputField
                      label={"Nombre de usuario"}
                      type={"text"}
                      onBlur={() => trigger("username")}
                      register={register}
                      name={"username"}
                      required={true}
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <InputField
                        label={"*Contraseña"}
                        type={showPassword ? "text" : "password"}
                        onBlur={() => trigger("oldPassword")}
                        register={register}
                        name={"oldPassword"}
                        required={true}
                      />
                      <button
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors?.oldPassword && (
                      <div
                        className={`flex items-center text-sm text-red-500 duration-200 transform transition-all ${
                          errors?.oldPassword ? "opactity-100" : "opacity-0"
                        }`}
                      >
                        <IoInformationCircleOutline size={18} />
                        <span>Este campo es obligatorio</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <AccordionField>
                      <div className="w-72 mb-2 mt-2">
                        <div className="relative">
                          <InputField
                            label={"Nueva Contraseña"}
                            type={showNewPassword ? "text" : "password"}
                            onBlur={() => trigger("newPassword")}
                            register={register}
                            name={"newPassword"}
                            required={false}
                          />
                          <button
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="relative">
                          <InputField
                            label={"Confirmar Nueva Contraseña"}
                            type={showConfirmNewPassword ? "text" : "password"}
                            onBlur={() => trigger("confirmNewPassword")}
                            register={register}
                            name={"confirmNewPassword"}
                            required={false}
                          />
                          <button
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
                            onClick={() =>
                              setShowConfirmNewPassword(!showConfirmNewPassword)
                            }
                          >
                            {showConfirmNewPassword ? (
                              <FaEyeSlash />
                            ) : (
                              <FaEye />
                            )}
                          </button>
                        </div>
                      </div>
                    </AccordionField>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex justify-center _lg:justify-end gap-x-4 mb-10 _sm:mb-0">
                <button
                  className="bg-textColorGray p-2 text-white rounded-lg hover:bg-textHeaderColorGray"
                  onClick={() => router.push("/accounts")}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`
                bg-colorPrimario p-2 text-white rounded-lg text-nowrap
                ${
                  isNotDisable
                    ? "cursor-no-drop"
                    : " hover:bg-colorHoverPrimario  hover:cursor-pointer"
                }`}
                  onClick={handleSubmit(onSubmit)}
                  disabled={isNotDisable}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default page;
