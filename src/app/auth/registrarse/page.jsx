"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/Registrarse.module.css";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/contexts/UserProvider";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const defaultValues = {
  username: "",
  password: "",
  password_confirmation: "",
};

const page = () => {
  const [isError, setIsError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isNumeroError, setIsNumeroError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
    watch,
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

    if (formData.password.length < 8) {
      setIsPasswordError(false);
      setIsError(false);
      setIsNumeroError(true);
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

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const passwordValue = watch("password", "");
  const passwordConfirmationValue = watch("password_confirmation", "");

  return (
    <div className={styles.content}>
      <div className={styles.content_image}>
        <Image src="/image/img_inicio.png" width={400} height={200} />
      </div>
      <div className={styles.content_registrarse}>
        <div className={styles.content_detalle}>
          <div>
            <h1 className={styles.content_title}>REGISTRARTE!</h1>
          </div>
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

            {error && !isPasswordError && !isNumeroError && (
              <p className="bg-red-500 p-2 text-white font-bold mb-3 m-0">
                Nombre de usuario en uso
              </p>
            )}

            {isNumeroError && (
              <div className="bg-red-500 p-2 text-white font-bold mb-3 m-0" F>
                <p>La contraseña debe tener</p>
                <p>8 caracteres minimo</p>
                <p>debe contener al menos 1 numero</p>
              </div>
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

            <div className={styles.input_password}>
              <input
                type={showPassword ? "text" : "password"}
                className="password"
                placeholder="contraseña"
                {...register("password", {
                  required: "Debe ingresar su contraseña",
                })}
                onBlur={() => trigger("password")}
              />

              {passwordValue && (
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className={`${styles.eye} fa fa-eye`}
                  aria-hidden="true"
                  onClick={handleShowPassword}
                />
              )}
            </div>

            <div className={styles.input_password}>
              <input
                type={showPasswordConfirm ? "text" : "password"}
                className="password"
                placeholder="confirmar la contraseña"
                {...register("password_confirmation", {
                  required: "Debe ingresar su contraseña",
                })}
                onBlur={() => trigger("password_confirmation")}
              />

              {passwordConfirmationValue && (
                <FontAwesomeIcon
                  icon={showPasswordConfirm ? faEyeSlash : faEye}
                  className={`${styles.eye} fa fa-eye`}
                  aria-hidden="true"
                  onClick={handleShowPasswordConfirm}
                />
              )}
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
