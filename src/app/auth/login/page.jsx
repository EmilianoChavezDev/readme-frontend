"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/Inicio.module.css";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/contexts/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/common/Loading";

const defaultValues = {
  username: "",
  password: "",
};

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const { data, error, loading, login } = useAuth();
  const { login: saveUser } = useUser();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
  } = useForm({ defaultValues });

  const onSubmit = async (formData) => {
    login(formData);
  };

  useEffect(() => {
    if (!data || error) return;
    saveUser(data);
  }, [data]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleFocusPassword = () => {
    setIsFocusedPassword(true);
  };

  const handleBlurPassword = () => {
    setIsFocusedPassword(false);
  };

  const passwordValue = watch("password", "");
  const usernameValue = watch("username", "");

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
          <div className={styles.content_logo}>
            <Image
              src={"/image/g2.png"}
              alt="imagen logo"
              width={250}
              height={250}
            />
          </div>
          {error && (
            <p className="bg-red-500 p-2 text-white font-bold mb-3 m-0">
              Usuario o contraseña no valido
            </p>
          )}
          <div>
            <div
              className={`${styles.content_title_correo} ${
                isFocused || usernameValue ? styles.active : styles.noactive
              }`}
            >
              <label
                className={`${isFocused || usernameValue ? styles.active : ""}`}
              >
                Nombre de usuario
              </label>

              <input
                type="text"
                placeholder={`${!isFocused ? "Nombre de usuario" : ""}`}
                {...register("username", {
                  required: "Debe ingresar su nombre de usuario",
                })}
                onBlur={() => {
                  trigger("username"), handleBlur();
                }}
                onFocus={() => handleFocus()}
              />
              {errors.username && (
                <div className={styles.errors}>{errors.username.message}</div>
              )}
            </div>

            {/*parte del password */}
            <div
              className={`${styles.content_password} ${
                isFocusedPassword || passwordValue
                  ? styles.active
                  : styles.noactive
              }`}
            >
              <label
                className={`${
                  isFocusedPassword || passwordValue ? styles.active : ""
                }`}
              >
                Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                {...register("password", {
                  required: "Debe ingresar su contraseña",
                })}
                onBlur={() => {
                  trigger("password"), handleBlurPassword();
                }}
                onFocus={() => handleFocusPassword()}
              />
              {passwordValue && (
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className={`${
                    errors.password ? styles.eyes : styles.eye
                  }   fa fa-eye`}
                  aria-hidden="true"
                  onClick={handleShowPassword}
                />
              )}
              {errors.password && (
                <div className={styles.errors}>{errors.password.message}</div>
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
              {loading ? <Loading /> : "Iniciar Sesión"}
            </button>
            <div className={styles.content_crear_cuenta}>
              <span>No tienes cuenta?</span>{" "}
              <Link href={"/auth/registrarse"}>Registrate!</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
