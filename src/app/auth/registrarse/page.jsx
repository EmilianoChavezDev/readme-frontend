"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/Registrarse.module.css";
import style from "../login/styles/Inicio.module.css";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/contexts/UserProvider";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/common/Loading";
import UsernameInput from "@/components/common/InputUsername";
import PasswordInput from "@/components/common/InputPassword";

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
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedPasswordConfirm, setIsFocusedPasswordConfirm] =
    useState(false);

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
  const handleFocusPasswordConfirm = () => {
    setIsFocusedPasswordConfirm(true);
  };

  const handleBlurPasswordConfirm = () => {
    setIsFocusedPasswordConfirm(false);
  };

  const passwordValue = watch("password", "");
  const passwordConfirmationValue = watch("password_confirmation", "");
  const usernameValue = watch("username", "");

  return (
    <div className={styles.content}>
      <div className={styles.content_image}>
        <Image
          src="/image/img_inicio.png"
          width={400}
          height={200}
          alt="imagen presentacion"
        />
      </div>
      <div className={styles.content_registrarse}>
        <div className={styles.content_detalle}>
          <div className={styles.content_logo}>
            <Image
              src={"/image/g2.png"}
              alt="imagen logo"
              width={250}
              height={250}
            />
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

            {error && (
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
            <div className="gap-y-2">
              <div>
                <UsernameInput
                  isFocused={isFocused}
                  usernameValue={usernameValue}
                  styles={style}
                  register={register}
                  trigger={trigger}
                  handleBlur={handleBlur}
                  handleFocus={handleFocus}
                  errors={errors}
                  placeholder={"*Nombre de usuario"}
                  date={"username"}
                />
              </div>

              <div>
                <PasswordInput
                  isFocusedPassword={isFocusedPassword}
                  passwordValue={passwordValue}
                  showPassword={showPassword}
                  errors={errors}
                  handleBlurPassword={handleBlurPassword}
                  handleFocusPassword={handleFocusPassword}
                  handleShowPassword={handleShowPassword}
                  register={register}
                  trigger={trigger}
                  styles={style}
                  placeholder={"*Contraseña"}
                  date={"password"}
                />
              </div>

              <div className="mt-4 mb-2">
                <PasswordInput
                  isFocusedPassword={isFocusedPasswordConfirm}
                  passwordValue={passwordConfirmationValue}
                  showPassword={showPasswordConfirm}
                  errors={errors}
                  handleBlurPassword={handleBlurPasswordConfirm}
                  handleFocusPassword={handleFocusPasswordConfirm}
                  handleShowPassword={handleShowPasswordConfirm}
                  register={register}
                  trigger={trigger}
                  styles={style}
                  placeholder={"*Repetir contraseña"}
                  date={"password_confirmation"}
                />
              </div>

              <div className={styles.content_date}>
                <input
                  type="date"
                  {...register("fecha_nacimiento", {
                    required: "*Ingrese su fecha de nacimiento",
                  })}
                  onBlur={() => trigger("fecha_nacimiento")}
                />
              </div>
            </div>
          </div>
          <div className={styles.content_button_submit}>
            <button
              type="submit"
              id="register-btn"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? <Loading /> : "Registrarte"}
            </button>
          </div>

          <div />
          <div className={styles.content_button}>
            <div>
              <p>¿Tienes una cuenta?</p>
            </div>
            <div className={styles.content_link}>
              <Link href={"/auth/login "}>Iniciar Sesion</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
