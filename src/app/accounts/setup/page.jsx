"use client";
import InputField from "@/components/common/InputField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

const defaultValues = {
  username: "",
  lastname: "",
  direction: "",
  nationality: "",
  description: "",
};

export default function SetUp() {
  const [isFocused, setIsFocused] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <div>
        <Image
          src="/image/img_inicio.png"
          width={400}
          height={200}
          alt="imagen presentacion"
        />
      </div>

      <div className="bg-colorFondo p-3 rounded-2xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 h-3/5 rounded-xl">
        <span className="flex justify-end">
          <button className="py-2 px-6 text-white bg-colorPrimario rounded-md flex justify-end">
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

        <div className="flex flex-col gap-y-4 items-center pt-7">
          <InputField
            label={"Nombre"}
            type={"text"}
            onBlur={handleBlur}
            register={register}
            name={"username"}
            className={`bg-white `}
          />

          <InputField
            label={"Apellido"}
            type={"text"}
            onBlur={handleBlur}
            register={register}
            name={"lastname"}
            className={`bg-white `}
          />

          <InputField
            label={"Direccion"}
            type={"text"}
            onBlur={handleBlur}
            register={register}
            name={"direction"}
            className={`bg-white `}
          />

          <InputField
            label={"Nacionalidad"}
            type={"text"}
            onBlur={handleBlur}
            register={register}
            name={"nationality"}
            className={`bg-white `}
          />

          <div className="w-72">
            <div className="relative w-full min-w-[200px]">
              <textarea
                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                id="descripcion"
                rows="4"
                {...register("descripcion")}
                onBlur={handleBlur}
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Descripción
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-14">
          <button className="py-2 px-6 mx-6 text-white bg-colorPrimario rounded-md ">
            Saltar este paso
          </button>

          <button className="py-2 px-3 mx-6 text-white bg-colorPrimario rounded-md ">
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
}
