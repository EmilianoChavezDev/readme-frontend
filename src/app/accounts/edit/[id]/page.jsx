"use client";

import NavBar from "@/components/NavBar";
import Date from "@/components/accounts/Date";
import { InputAccount } from "@/components/accounts/Input";
import ProfileImageUploader from "@/components/accounts/ProfileImage";
import Loader from "@/components/common/loader";
import useUser from "@/hooks/useUser";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

const page = ({ params }) => {
  const { getUserInformation, data, loading } = useUser();

  const defaultValues = {
    username: data?.username,
    password: "",
    newPassword: "",
    date: data?.fecha_de_nacimiento,
  };

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
  } = useForm({ defaultValues });

  useEffect(() => {
    getUserInformation(params.id);
  }, []);

  const onSubmit = (formData) => {
    console.log(formData);
  };

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
                <div>
                  <InputAccount
                    placeholder={"Nombre de usuario"}
                    value={defaultValues.username}
                    trigger={trigger}
                    register={register}
                    date={"username"}
                    type={"text"}
                  />
                </div>
                <div>
                  <InputAccount
                    placeholder={"Nueva contraseña"}
                    value={""}
                    trigger={trigger}
                    register={register}
                    date={"username"}
                    type={"text"}
                  />
                </div>
                <div>
                  <InputAccount placeholder={"Contraseña anterior"} />
                </div>

                <div>
                  <Date fechaNacimiento={defaultValues.date} />
                </div>
              </div>
            </div>

            <div className="_lg:mt-16 flex justify-center _lg:ml-96  _lg:items-end _lg:gap-x-3">
              <button className="bg-textColorGray p-2 text-white rounded-lg hover:bg-textHeaderColorGray ml-52">
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
