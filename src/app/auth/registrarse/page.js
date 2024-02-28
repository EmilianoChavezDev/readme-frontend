"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/Registrarse.module.css";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/contexts/UserProvider";
import moment from "moment";

const defaultValues = {
  username: "",
  password: "",
  password_confirmation: "",
};

const page = () => {
  const [isError, setIsError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isNumeroError, setIsNumeroError] = useState(false);

  const { data, error, loading, register: registro } = useAuth();
  const { login: saveUser } = useUser();

  useEffect(() => {
    if (!data || error) return;
    saveUser(data);
  }, [data]);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (formData) => {
    if (
      !formData.username ||
      !formData.password ||
      !formData.password_confirmation ||
      !formData.fecha_nacimiento
    ) {
      setIsError(true);
      setIsPasswordError(false);
      setIsNumeroError(false);
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setIsPasswordError(true);
      setIsError(false);
      setIsNumeroError(false);
      return;
    }

    if (!/\d/.test(formData.password)) {
      setIsNumeroError(true);
      setIsPasswordError(false);
      setIsError(false);
      return;
    }

    formData.role = "usuario";
    const fecha = moment(formData.fecha_nacimiento).format("DD-MM-YYYY");
    formData.fecha_nacimiento = fecha;
    setIsPasswordError(false);
    setIsError(false);
    setIsNumeroError(false);
    registro(formData);
  };

  return (
    <div className={styles.content}>
      <div className={styles.content_image}>
        <Image src="/image/img_inicio.png" width={400} height={200} />
      </div>
      <div className={styles.content_registrarse}>
        <div className={styles.content_detalle}>
          <div className={styles.content_informacion}>
            {isError && (
              <p className="bg-red-500 p-2 text-white font-bold mb-3 m-0">
                Por favor complete todos los campos
              </p>
            )}

            {isPasswordError && (
              <p className="bg-red-500 p-2 text-white font-bold mb-3 m-0">
                Las contraseñas no coinciden
              </p>
            )}

            {error && (
              <p className="bg-red-500 p-2 text-white font-bold mb-3 m-0">
                Nombre de usuario en uso
              </p>
            )}

            {isNumeroError && (
              <p className="bg-red-500 p-2 text-white font-bold mb-3 m-0">
                Contraseña no valida
              </p>
            )}

            <div className={styles.content_title_correo}>
              <input
                type="text"
                placeholder="nombre de usuario"
                {...register("username", {
                  required: "Debe ingresar su nombre de usuario",
                })}
                onBlur={() => trigger("username")}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="ej: pass1234"
                {...register("password", {
                  required: "Debe ingresar su contraseña",
                })}
                onBlur={() => trigger("password")}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="confirmar la contraseña"
                {...register("password_confirmation", {
                  required: "Debe ingresar su contraseña",
                })}
                onBlur={() => trigger("password_confirmation")}
              />
            </div>
            <div className={styles.content_date}>
              <input
                type="date"
                {...register("fecha_nacimiento", {
                  required: "Debe ingresar su contraseña",
                })}
                onBlur={() => trigger("fecha_nacimiento")}
              />
            </div>
          </div>
          <div className={styles.content_button_submit}>
            <button
              type="submit"
              id="register-btn"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? "Registrandosé..." : "Registrarte"}
            </button>
          </div>

          <div />
          <div className={styles.content_button}>
            <div>
              <p>¿Tienes una cuenta?</p>
            </div>
            <div>
              <Link href={"/auth/login "}>Iniciar Sesion</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
