
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
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setIsPasswordError(true);
      return;
    }

    formData.role = "usuario";
    const fecha = moment(formData.fecha_nacimiento).format("DD-MM-YYYY");
    formData.fecha_nacimiento = fecha;
    registro(formData);
  };

import React from "react";
import styles from "./styles/Registrarse.module.css";
import Image from "next/image";
import Link from "next/link";
const page = () => {

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
                Rellenar todos los campos necesarios
              </p>
            )}
            {isPasswordError && (
              <p className="bg-red-500 p-2 text-white font-bold mb-3 m-0">
                Las contraseñas no coinciden
              </p>
            )}

            <div className={styles.content_title_correo}>
              <p>Nombre de usuario</p>
              <input
                type="text"
                placeholder="nickname"
                {...register("username", {
                  required: "Debe ingresar su nombre de usuario",
                })}
                onBlur={() => trigger("username")}
              />
            </div>

            <div>
              <p>Nueva contraseña</p>
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
              <p>Confirmar la contraseña</p>
              <input
                type="password"
                placeholder="repita la contraseña"
                {...register("password_confirmation", {
                  required: "Debe ingresar su contraseña",
                })}
                onBlur={() => trigger("password_confirmation")}
              />
            </div>
            <div className={styles.content_date}>
              <p>Fecha de nacimiento</p>
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

            <div className={styles.content_title_correo}>
              <p>Nombre de usuario</p>
              <input type="text" placeholder="nickname" />
            </div>
            <div>
              <p>Correo electrónico</p>
              <input type="email" placeholder="example@email.com" />
            </div>
            <div>
              <p>Nueva contraseña</p>
              <input type="password" placeholder="contraseña nueva" />
            </div>
            <div>
              <p>Confirmar la contraseña</p>
              <input type="password" placeholder="confirmar contraseña" />
            </div>
            <div className={styles.content_date}>
              <p>Fecha de nacimiento</p>
              <input type="date" />
            </div>
          </div>
          <div className={styles.content_button_submit}>
            <button type="submit">Registrarte</button>

          </div>

          <div />
          <div className={styles.content_button}>
            <p>¿Tienes una cuenta?</p>

            <Link href={"/auth/login "}>Iniciar Sesion</Link>

            <Link href={"/Login"}>Iniciar Sesion</Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
