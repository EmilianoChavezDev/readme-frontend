"use client";

import NavBar from "@/components/NavBar";
import ProfileImageUploader from "@/components/accounts/ProfileImage";
import Loader from "@/components/common/loader";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/common/InputField";
import DateField from "@/components/common/DateField";
import useUserInfo from "@/hooks/useUser";
import { useUser } from "@/contexts/UserProvider";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AccordionField from "@/components/accounts/Accordion";

const defaultValues = {
  username: "",
  oldPassword: "",
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
    updateProfile,
    isImageChange,
  } = useUserInfo();
  const router = useRouter();
  const { login } = useUser();
  const [date, setDate] = useState(null);
  const [changeImage, setChangeImage] = useState(false);

  const [profileImage, setProfileImage] = useState(null);

  const initials = data?.username
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        setChangeImage(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    getUserInformation(params.id);
  }, []);

  useEffect(() => {
    if (data?.profile) {
      setProfileImage(data?.profile);
    }
  }, [data?.profile]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isTrue) {
      toast.success(message);
    }
    if (isImageChange) {
      toast.success("Foto de perfil actualizado!!");
    }
  }, [isError, isTrue, isImageChange]);

  useEffect(() => {
    if (!currentData) return;
    login(currentData);
  }, [currentData]);

  useEffect(() => {
    if (!data) return;
    reset({
      username: data?.username,
      fecha_nacimiento: data?.fecha_de_nacimiento || null,
    });
  }, [data]);

  const formatDate = (date) => {
    return date ? format(date, "dd-MMM-yyyy", { locale: es }) : "";
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    trigger("fecha_nacimiento");
  };

  //validaciones
  const onSubmit = (formData) => {
    if (formData.username !== data.username) {
      updateUsername(formData.username, formData.oldPassword);
    }

    if (formData.newPassword && formData.newPassword !== formData.oldPassword) {
      if (formData.newPassword === formData.confirmNewPassword) {
        if (
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.newPassword)
        ) {
          updatePassword(
            formData.oldPassword,
            formData.newPassword,
            formData.confirmNewPassword
          );
        } else {
          toast.error(
            "La nueva contraseña debe tener al menos 8 caracteres y al menos un número."
          );
        }
      } else {
        toast.error("Las contraseñas no coinciden");
      }
    }

    if (changeImage && formData.oldPassword != "") {
      updateProfile(profileImage);
    } else {
      toast.error("Ingrese su contraseña para el cambio");
    }

    reset({
      username: data?.username,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      fecha_nacimiento: data?.fecha_de_nacimiento || null,
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <NavBar />
          <div className="flex flex-col">
            <div
              className="flex _md:mx-auto _md:w-5/6 w-full _lg:px-4 _md:mt-14 _sm:justify-between _md:items-center
            mt-8 flex-col _sm:flex-row
            "
            >
              <div className="flex flex-col">
                <h1 className="text-textHeaderColorGray text-2xl font-bold text-nowrap text-center">
                  Información Personal
                </h1>
                <div className="flex flex-col _xl:ml-36 _xl:mt-28 _sm:mt-10 items-center">
                  <ProfileImageUploader
                    initials={initials}
                    profileImage={profileImage}
                    handleImageChange={handleImageChange}
                  />
                  <div className="mt-72  text-center text-colorPrimario font-semibold">
                    <span className="font-normal mr-1">Nombre de usuario:</span>
                    <span>{params.id}</span>
                  </div>
                </div>
              </div>
              <div className="flex mt-10 _sm:mt-0 flex-col items-center _lg:justify-start _sm:items-start _xl:mr-56 xl:mr-96 _sm:gap-y-8 gap-y-4">
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
                  <InputField
                    label={"*Contraseña"}
                    type={"password"}
                    onBlur={() => trigger("oldPassword")}
                    register={register}
                    name={"oldPassword"}
                    required={true}
                  />
                </div>

                <div>
                  <DateField
                    label={"Fecha de nacimiento"}
                    value={formatDate(date || data?.fecha_de_nacimiento)}
                    selected={date}
                    onSelect={handleDateChange}
                  />
                </div>

                <div>
                  <AccordionField>
                    <div className="w-72 mb-2 mt-2">
                      <InputField
                        label={"Nueva Contraseña"}
                        type={"password"}
                        onBlur={() => trigger("newPassword")}
                        register={register}
                        name={"newPassword"}
                        required={false}
                      />
                    </div>
                    <div>
                      <InputField
                        label={"Confirmar Nueva Contraseña"}
                        type={"password"}
                        onBlur={() => trigger("confirmNewPassword")}
                        register={register}
                        name={"confirmNewPassword"}
                        required={false}
                      />
                    </div>
                  </AccordionField>
                </div>
              </div>
            </div>
            <div className="_sm:mt-16 mt-10 flex justify-center _sm:ml-96  _sm:items-end gap-x-3">
              <button
                className="bg-textColorGray p-2 text-white rounded-lg hover:bg-textHeaderColorGray ml-52"
                onClick={() => router.push("/accounts")}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-colorPrimario p-2 text-white rounded-lg hover:bg-colorHoverPrimario text-nowrap mr-48 _lg:mr-0 "
                disabled={loading}
                onClick={handleSubmit(onSubmit)}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default page;
