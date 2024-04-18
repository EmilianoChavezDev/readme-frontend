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
import Loading from "@/components/common/Loading";
import UsernameInput from "@/components/common/InputUsername";
import PasswordInput from "@/components/common/InputPassword";
import DateInput from "@/components/common/DateInput";
import EmailInput from "@/components/common/EmailInput";

const defaultValues = {
  username: "",
  password: "",
  password_confirmation: "",
};

const page = () => {
  const [isError, setIsError] = useState(false);
  const [isErrorFecha, setIsErrorFecha] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isNumeroError, setIsNumeroError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedDate, setIsFocusedDate] = useState(false);
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
      !formData.email ||
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

    if (!validarFechaNacimiento(formData.fecha_nacimiento)) {
      setIsErrorFecha(true);
      return;
    }

    formData.role = "usuario";
    const fecha = moment(formData.fecha_nacimiento).format("DD-MM-YYYY");
    formData.fecha_nacimiento = fecha;
    setIsPasswordError(false);
    setIsError(false);
    setIsNumeroError(false);
    setIsErrorFecha(false);
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
  const handleFocusDate = () => {
    setIsFocusedDate(true);
  };

  const handleBlurDate = () => {
    setIsFocusedDate(false);
  };

  const validarFechaNacimiento = (fechaNacimiento) => {
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 15);
    const fechaNacimientoDate = new Date(fechaNacimiento);

    const diferenciaAnhos =
      (currentDate - fechaNacimientoDate) / (1000 * 60 * 60 * 24 * 365);

    return diferenciaAnhos >= 15;
  };

  const passwordValue = watch("password", "");
  const passwordConfirmationValue = watch("password_confirmation", "");
  const usernameValue = watch("username", "");
  const emailValue = watch("email","")
  const dateValue = watch("fecha_nacimiento", "");

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
            <div className={styles.content_errores}>
              {isError && (
                <p className="bg-red-500 p-2 text-white font-bold mb-5 mx-0">
                  Por favor complete todos los campos
                </p>
              )}
              {isPasswordError && (
                <p className="bg-red-500 p-2 text-white font-bold mb-5 mx-0">
                  Las contraseñas no coinciden
                </p>
              )}

              {error && (
                <p className="bg-red-500 p-2 text-white font-bold mb-5 mx-0">
                  Nombre de usuario en uso
                </p>
              )}

              {isNumeroError && (
                <div className="bg-red-500 p-2 text-white font-bold mb-5 mx-0">
                  <p>La contraseña debe tener</p>
                  <p>8 caracteres minimo</p>
                  <p>debe contener al menos 1 numero</p>
                </div>
              )}
              {isErrorFecha && (
                <div className="bg-red-500 p-2 text-white font-bold mb-5 mx-0 text-center">
                  <p>Debes tener 15 o mas para</p>
                  <p>registrarte</p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
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
                <EmailInput
                  isFocused={isFocusedEmail}
                  emailValue={emailValue}
                  styles={style}
                  register={register}
                  trigger={trigger}
                  handleBlur={handleBlur}
                  handleFocus={handleFocus}
                  errors={errors}
                  placeholder={"*Email"}
                  date={"email"}
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
                  placeholder={"*Confirmar contraseña"}
                  date={"password_confirmation"}
                />
              </div>
              <DateInput
                register={register}
                styles={styles}
                isFocusedDate={isFocusedDate}
                dateValue={dateValue}
                handleFocusDate={handleFocusDate}
                handleBlurDate={handleBlurDate}
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
