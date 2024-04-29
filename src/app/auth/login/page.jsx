"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/Inicio.module.css";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/contexts/UserProvider";
import Loading from "@/components/common/Loading";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "@/components/common/InputField";
import { Error } from "@/components/common/Error";
import PageTheme from "@/components/common/PageTheme";

const defaultValues = {
  email: "",
  password: "",
};

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { data, error, loading, errorResponse, login } = useAuth();
  const { login: saveUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (formData) => {
    login(formData);
  };

  useEffect(() => {
    if (!data || error) return;
    saveUser(data);
  }, [data]);

  useEffect(() => {
    if (!errorResponse) return;
  }, [errorResponse]);

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <PageTheme>
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

          <div className="flex flex-col gap-y-2">
            {/*parte del email */}
            <InputField
              label={"Email"}
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

            {/*parte del password */}
            <div className="relative">
              <InputField
                label={"Contraseña"}
                type={showPassword ? "text" : "password"}
                onBlur={handleBlur}
                register={register}
                name={"password"}
                required={true}
                className="bg-white"
              />

              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-2xs px-3">
                *Este campo es requerido
              </p>
            )}
            <div className={styles.content_cambiar_contrasena}>
              <Link href={"/auth/forgot_password"}>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <div className={styles.content_button}>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              id="login-btn"
              disabled={loading}
            >
              {loading ? <Loading /> : "Iniciar Sesión"}
            </button>
            <div className={styles.content_crear_cuenta}>
              <span>¿No tienes cuenta?</span>{" "}
              <Link href={"/auth/registrarse"}>¡Registrate!</Link>
            </div>
          </div>
        </div>
      </div>
    </PageTheme>
  );
};

export default Page;
