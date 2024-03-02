"use client";
import React, { useEffect } from "react";
import styles from "./styles/Inicio.module.css";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/contexts/UserProvider";

const defaultValues = {
  username: "",
  password: "",
};

const page = () => {
  const { data, error, loading, login } = useAuth();
  const { login: saveUser } = useUser();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (formData) => {
    login(formData);
  };

  useEffect(() => {
    if (!data || error) return;
    saveUser(data);
  }, [data]);

  return (
    <div className={styles.content}>
      <div className={styles.content_image}>
        <Image
          src="/image/img_inicio.png"
          width={400}
          height={200}
          alt="Imagen de inicio"
        />
      </div>
      <div className={styles.content_login}>
        <div className={styles.content_detalle}>
          <div>
            <h1 className={styles.content_title}>Readme</h1>
          </div>
          {error && (
            <p className="bg-red-500 p-2 text-white font-bold mb-3 m-0">
              Usuario o contraseña no valido
            </p>
          )}
          <div>
            <div className={styles.content_title_correo}>
              <input
                className="text-center"
                type="text"
                placeholder="nombre de usuario"
                {...register("username", {
                  required: "Debe ingresar su nombre de usuario",
                })}
                onBlur={() => trigger("username")}
              />
              {errors.username && (
                <div className="text-red-500 text-center">
                  {errors.username.message}
                </div>
              )}
            </div>
            <div>
              <input
                className="text-center"
                type="password"
                placeholder="contraseña"
                {...register("password", {
                  required: "Debe ingresar su contraseña",
                })}
                onBlur={() => trigger("password")}
              />
              {errors.password && (
                <div className="text-red-500 text-center">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>
          <div className={styles.content_button}>
            <button
              type="button"
              id="login-btn"
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
            >
              {loading ? "Iniciando Sesión..." : "Iniciar Sesión"}
            </button>
            <div className={styles.content_crear_cuenta}>
              <span>No tienes cuenta?</span>{" "}
              <Link href={"/auth/registrarse "}>Registrate</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
