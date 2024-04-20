"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/Registrarse.module.css";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import moment from "moment";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/contexts/UserProvider";
import Loading from "@/components/common/Loading";
import InputField from "@/components/common/InputField";
import { Error } from "@/components/common/Error";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const defaultValues = {
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const Page = () => {
  const [isError, setIsError] = useState(false);
  const [isErrorFecha, setIsErrorFecha] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isNumeroError, setIsNumeroError] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const { data, error, loading, register: registro } = useAuth();
  const { login: saveUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!data || error) return;
    saveUser(data);
  }, [data]);

  const { register, handleSubmit } = useForm({ defaultValues });

  const onSubmit = async (formData) => {
    if (
      !formData.username ||
      !formData.password ||
      !formData.password_confirmation ||
      !formData.email ||
      !formData.fecha_nacimiento
    ) {
      setIsError(true);
      setIsNumeroError(false);
      setIsErrorFecha(false);
      setIsErrorEmail(false);
      return;
    }

    setIsError(false);

    if (formData.password !== formData.password_confirmation) {
      setIsPasswordError(true);
      setIsNumeroError(false);
      setIsErrorFecha(false);
      setIsErrorEmail(false);
      return;
    }

    setIsPasswordError(false);

    if (!/\d/.test(formData.password)) {
      setIsNumeroError(true);
      setIsPasswordError(false);
      setIsErrorFecha(false);
      setIsErrorEmail(false);
      return;
    }

    setIsNumeroError(false);

    if (formData.password.length < 8) {
      setIsNumeroError(true);
      setIsPasswordError(false);
      setIsErrorFecha(false);
      setIsErrorEmail(false);
      return;
    }

    setIsNumeroError(false);

    if (!validarFechaNacimiento(formData.fecha_nacimiento)) {
      setIsErrorFecha(true);
      setIsPasswordError(false);
      setIsNumeroError(false);
      setIsErrorEmail(false);
      return;
    }

    setIsErrorFecha(false);

    if (!validarEmail(formData.email)) {
      setIsErrorEmail(true);
      setIsPasswordError(false);
      setIsNumeroError(false);
      setIsErrorFecha(false);
      return;
    }

    setIsErrorEmail(false);

    formData.role = "usuario";
    const fecha = moment(formData.fecha_nacimiento).format("DD-MM-YYYY");
    formData.fecha_nacimiento = fecha;
    setIsPasswordError(false);
    setIsError(false);
    setIsNumeroError(false);
    setIsErrorFecha(false);
    registro(formData);

    // Redirigir a la pagina de confirmacion de correo electronico
    //router.push("/auth/confirmacion");
  };

  const handleBlur = () => {
    setIsFocused(false);
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

  const validarEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
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
          <div className={styles.content_informacion}>
            <div>
              {isError && (
                <Error>
                  <p>Por favor complete todos los campos</p>
                </Error>
              )}

              {isPasswordError && (
                <Error>
                  <p>Las contraseñas no coinciden</p>
                </Error>
              )}

              {error && (
                <Error>
                  <p>Nombre de usuario en uso</p>
                </Error>
              )}

              {isNumeroError && (
                <Error>
                  <p>La contraseña debe tener</p>
                  <p>8 caracteres minimo</p>
                  <p>debe contener al menos 1 numero</p>
                </Error>
              )}

              {isErrorFecha && (
                <Error>
                  <p>Debes tener 15 o mas para</p>
                  <p>registrarte</p>
                </Error>
              )}

              {isErrorEmail && (
                <Error>
                  <p>El email ingresado no es valido</p>
                </Error>
              )}
            </div>
            <div className="flex flex-col gap-y-3">
              {/*parte del username */}
              <InputField
                label={"*Nombre de usuario"}
                type={"text"}
                onBlur={handleBlur}
                register={register}
                name={"username"}
                required={true}
                className={"bg-white"}
              />

              <div>
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
              </div>

              <div className="relative">
                {/*parte del password */}
                <InputField
                  label={"*Contraseña"}
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

              <div className="relative">
                {/*parte del confirm password */}
                <InputField
                  label={"*Confirmar contraseña"}
                  type={showPasswordConfirmation ? "text" : "password"}
                  onBlur={handleBlur}
                  register={register}
                  name={"password_confirmation"}
                  required={true}
                  className="bg-white"
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
                  onClick={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                >
                  {showPasswordConfirmation ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/*parte de la fecha de nacimiento */}
              <InputField
                label={"*Fecha de nacimiento"}
                type={"date"}
                onBlur={handleBlur}
                register={register}
                name={"fecha_nacimiento"}
                required={true}
                className="bg-white"
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

export default Page;
