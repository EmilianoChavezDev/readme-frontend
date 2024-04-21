"use client";
import { Error } from "@/components/common/Error";
import InputField from "@/components/common/InputField";
import Loading from "@/components/common/Loading";
import { Success } from "@/components/common/Success";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../login/styles/Inicio.module.css";

const defaultValues = {
  email: "",
};

const Page = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  const {
    data,
    error,
    loading,
    errorResponse,
    successResponse,
    forgotPassword,
    resendPassword,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (formData) => {
    forgotPassword(formData);
    setIsDisplayed(true);
  };

  const resendPasswordCode = async (formData) => {
    resendPassword(formData);
  };

  console.log(successResponse);

  useEffect(() => {
    if (!errorResponse) return;
  }, [errorResponse]);

  useEffect(() => {
    if (!successResponse) return;
  }, [successResponse]);

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
          alt="Imagen de inicio"
        />
      </div>
      <div>
        <div className={styles.content_detalle}>
          <div className={styles.content_logo}>
            <Image
              src={"/image/g2.png"}
              alt="imagen logo"
              width={250}
              height={250}
            />
          </div>

          {errorResponse?.error && (
            <Error>
              <p>{errorResponse.error}</p>
            </Error>
          )}

          {successResponse.length >= 1 && (
            <Success>
              <p>{successResponse}</p>
            </Success>
          )}

          <div className="flex flex-col gap-y-2">
            {/*parte del email */}
            <InputField
              label={"*Email"}
              type={"email"}
              onBlur={handleBlur}
              register={register}
              name={"email"}
              required={true}
              className="bg-white"
            />

            {errors.email && (
              <p className="text-red-500 text-2xs px-3">
                *Este campo es requerido
              </p>
            )}
          </div>

          <div className={styles.content_button}>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              id="login-btn"
              disabled={loading}
            >
              {loading ? <Loading /> : "Enviar correo de recuperación"}
            </button>

            {successResponse.length >= 1 && (
              <a
                className=" text-green-700 underline hover:text-green-500 cursor-pointer"
                onClick={handleSubmit(resendPasswordCode)}
              >
                Reenviar codigo
              </a>
            )}

            <div className={styles.content_crear_cuenta}>
              <span>¿Ya tienes una cuenta?</span>{" "}
              <Link href={"/auth/login"}>¡Inicia Sesion!</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
