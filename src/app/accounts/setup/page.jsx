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
    <div>
      <div>
        <Image
          src="/image/img_inicio.png"
          width={400}
          height={200}
          alt="imagen presentacion"
        />
      </div>

      <div className="bg-colorFondo p-3 rounded-2xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/4 h-2/3 rounded-xl">
        <div className="flex justify-center pt-4">
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

          <InputField
            label={"Descripcion"}
            type={"textarea"}
            onBlur={handleBlur}
            register={register}
            name={"description"}
            className={`bg-white rounded-xl h-32`}
          />

          <div>
            <button>ASDa</button>
          </div>
        </div>
      </div>
    </div>
  );
}
