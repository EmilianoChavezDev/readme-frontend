"use client";

import NavBar from "@/components/NavBar";
import ProfileImageUploader from "@/components/accounts/ProfileImage";
import Loader from "@/components/common/loader";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import InputField from "@/components/common/InputField";
import useUserInfo from "@/hooks/useUser";
import { useUser } from "@/contexts/UserProvider";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AccordionField from "@/components/accounts/Accordion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";

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
    updateProfile,
    updateBirthday,
    deleteProfile,
  } = useUserInfo();
  const router = useRouter();
  const { refresh } = useUser();
  const [changeImage, setChangeImage] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isDeleteProfile, setIsDeleteProfile] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [isNotDisable, setIsNotDisable] = useState(true);

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

  const watchedFields = watch([
    "username",
    "fecha_nacimiento",
    "newPassword",
    "confirmNewPassword",
  ]);

  const initials = data?.username
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
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
  };

  useEffect(() => {
    if (!isDeleteProfile) return;
    setIsNotDisable(false);
    setProfileImage(null);
    setChangeImage(false);
  }, [isDeleteProfile]);

  // trae la informacion del usuario
  useEffect(() => {
    if (!params.id) return;
    getUserInformation(params.id);
  }, [params.id]);

  // cuando se trae la foto la coloco en pantalla
  useEffect(() => {
    if (data?.profile) {
      setProfileImage(data?.profile);
    }
  }, [data?.profile]);

  // si hay algun mensaje lanzo un toast con el mensaje
  useEffect(() => {
    if (isError && !isTrue) {
      console.log("entro error");
      toast.error(message);
      return;
    }
    if (isTrue && !isError) {
      toast.success(message);
      return;
    }
  }, [isError, isTrue]);

  useEffect(() => {
    // Verificar si hay cambios en los campos
    const areFieldsChanged = watchedFields.some(
      (field) => field !== defaultValues[field.name]
    );

    if (
      watchedFields[0] != data?.username &&
      watchedFields[1] != data?.fecha_de_nacimiento &&
      watchedFields[2] != defaultValues.newPassword &&
      watchedFields[3] != defaultValues.confirmNewPassword
    ) {
      if (areFieldsChanged && data) {
        setIsNotDisable(false);
      }
    }
  }, [watchedFields]);

  // si se efectuan cambios cambiar todo el entorno de la pagina con la informacion nueva
  useEffect(() => {
    if (!currentData) return;
    refresh(currentData);
  }, [currentData]);

  // traer los datos del usuario
  useEffect(() => {
    if (!data && !currentData) return;
    reset({
      username: data?.username,
      fecha_nacimiento:
        currentData?.fecha_de_nacimiento || data?.fecha_de_nacimiento,
    });
    setIsNotDisable(true);
  }, [data, currentData]);

  //validaciones
  const onSubmit = (formData) => {
    const currentDate = new Date();

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 15);

    const fechaNacimiento = new Date(formData.fecha_nacimiento);

    if (formData.username !== data.username) {
      updateUsername(formData.username, formData.oldPassword);
    }

    if (formData.newPassword && formData.confirmNewPassword != "") {
      if (
        formData.newPassword &&
        formData.newPassword !== formData.oldPassword
      ) {
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
            return;
          }
        } else {
          toast.error("Las contraseñas no coinciden");
          return;
        }
      } else {
        toast.error("La contraseña nueva no puede ser la misma que la actual");
        return;
      }
    }

    if ((currentDate - fechaNacimiento) / (1000 * 60 * 60 * 24 * 365) > 15) {
      if (formData.fecha_nacimiento !== data?.fecha_de_nacimiento) {
        updateBirthday(formData.oldPassword, formData.fecha_nacimiento);
      }
    } else {
      toast.error("Debes ser mayor a 15 años!");
      return;
    }

    if (changeImage) {
      updateProfile(profileImage, formData.oldPassword);
    }

    if (isDeleteProfile) {
      deleteProfile(formData.oldPassword);
    }

    reset({
      username: data?.username,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      fecha_nacimiento: data?.fecha_de_nacimiento,
    });
    setIsNotDisable(true);
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
              className="flex _md:mx-auto _md:w-5/6 w-full _lg:px-4 _md:mt-14 _md:justify-between _md:items-center
            mt-8 flex-col _md:flex-row
            "
            >
              <div className="flex flex-col">
                <h1 className="text-textHeaderColorGray text-2xl font-bold text-nowrap text-center">
                  Información Personal
                </h1>
                <div className="flex flex-col _xl:ml-36 _xl:mt-28 _md:mt-10 items-center">
                  <ProfileImageUploader
                    initials={initials}
                    profileImage={profileImage}
                    handleImageChange={handleImageChange}
                    handleDeleteProfile={handleDeleteProfile}
                    isDeleteProfile={isDeleteProfile}
                    setProfileImage={setProfileImage}
                    key={fileInputKey}
                  />
                  <div className="mt-72  text-center text-colorPrimario font-semibold">
                    <span className="font-normal mr-1">Nombre de usuario:</span>
                    <span>{params.id}</span>
                  </div>
                </div>
              </div>
              <div className="flex mt-10 _md:mt-0 flex-col items-center _lg:justify-start _md:items-start _xl:mr-56 xl:mr-96 _md:gap-y-8 gap-y-4">
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
                    label={"Fecha de nacimiento"}
                    type={"date"}
                    onBlur={() => trigger("fecha_nacimiento")}
                    register={register}
                    name={"fecha_nacimiento"}
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
                          {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                  </AccordionField>
                </div>
              </div>
            </div>
            <div className="_sm:mt-16 mt-10 flex justify-center _md:justify-end   _lg:mr-20 _xl:mr-80 gap-x-4 mb-10 _sm:mb-0">
              <button
                className="bg-textColorGray p-2 text-white rounded-lg hover:bg-textHeaderColorGray ml-52"
                onClick={() => router.push("/accounts")}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`
                bg-colorPrimario p-2 text-white rounded-lg text-nowrap mr-48 _lg:mr-0  _md:mr-14 
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
        </>
      )}
    </>
  );
};

export default page;
