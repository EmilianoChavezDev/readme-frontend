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
  password: "",
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
    error,
    message,
  } = useUserInfo();
  const router = useRouter();
  const { login } = useUser();
  const [date, setDate] = useState(null);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (!currentData) return;
    login(currentData);
  }, [currentData]);

  useEffect(() => {
    getUserInformation(params.id);
  }, []);

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

  const onSubmit = (formData) => {
    // Verificar si el nombre de usuario cambio
    if (formData.username !== usernameValue) {
      updateUsername(formData.username, formData.oldPassword);
      toast.success("Se ha actualizado tu nombre de usuario");
      console.log("username");
    }

    // Verificar si la contraseña cambio
    if (formData.newPassword !== oldPasswordValue) {
      // Verificar si la nueva contraseña coincide con la confirmación
      if (formData.newPassword === formData.confirmNewPassword) {
        if (
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.newPassword)
        ) {
          updatePassword(
            formData.oldPassword,
            formData.newPassword,
            formData.confirmNewPassword
          );
          toast.success("Tu contraseña ha sido actualizada!");
        } else {
          toast.error(
            "La nueva contraseña debe tener al menos 8 caracteres y al menos un número."
          );
        }
      } else {
        toast.error("Las contraseñas no coinciden");
      }
    } else {
      if (error) {
        console.log(error);
        toast.error(
          "La contraseña actual es incorrecta. Por favor, inténtalo de nuevo."
        );
      }
    }

    reset({
      username: data?.username,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      fecha_nacimiento: data?.fecha_de_nacimiento || null,
    });
  };

  const oldPasswordValue = watch("oldPassword", "");
  const usernameValue = watch("username", "");
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <NavBar />
          <div className="flex flex-col">
            <div className="flex _lg:mx-auto _lg:w-5/6 w-full _lg:px-4 _lg:mt-14 _lg:justify-between items-center">
              <div className="flex flex-col">
                <h1 className="text-textHeaderColorGray _lg:text-2xl font-bold">
                  Información Personal
                </h1>
                <div className="flex flex-col _lg:ml-36 _lg:mt-28">
                  <div>
                    <ProfileImageUploader
                      username={params.id}
                      profile={data?.profile}
                    />
                  </div>
                  <div className="_lg:mt-72 text-center text-colorPrimario font-semibold">
                    <span className="font-normal mr-1">Nombre de usuario:</span>
                    <span>{params.id}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  _lg:justify-start _lg:items-start _lg:mr-96 _lg:gap-y-8">
                <div className="w-72">
                  <InputField
                    label={"Nombre de usuario"}
                    type={"text"}
                    onBlur={() => trigger("username")}
                    register={register}
                    name={"username"}
                    required={true}
                  />
                </div>

                <div className="w-72">
                  <InputField
                    label={"*Contraseña"}
                    type={"password"}
                    onBlur={() => trigger("oldPassword")}
                    register={register}
                    name={"oldPassword"}
                    required={true}
                  />
                </div>

                <div className="w-72">
                  <DateField
                    label={"Fecha de nacimiento"}
                    value={formatDate(date || data?.fecha_de_nacimiento)}
                    selected={date}
                    onSelect={handleDateChange}
                  />
                </div>

                <div className="w-72">
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
                    <div className="w-72">
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

            <div className="_lg:mt-16 flex justify-center _lg:ml-96  _lg:items-end _lg:gap-x-3">
              <button
                className="bg-textColorGray p-2 text-white rounded-lg hover:bg-textHeaderColorGray ml-52"
                onClick={() => router.push("/accounts")}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-colorPrimario p-2 text-white rounded-lg hover:bg-colorHoverPrimario "
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
