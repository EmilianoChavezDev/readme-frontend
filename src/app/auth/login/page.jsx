"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/Inicio.module.css";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/contexts/UserProvider";
import Loading from "@/components/common/Loading";
import PasswordInput from "@/components/common/InputPassword";
import UsernameInput from "@/components/common/InputUsername";


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

            <UsernameInput
              isFocused={isFocused}
              usernameValue={usernameValue}
              styles={styles}
              register={register}
              trigger={trigger}
              handleBlur={handleBlur}
              handleFocus={handleFocus}
              errors={errors}
              date={"username"}
              placeholder={"Nombre de usuario"}
              message={"*Debe ingresar su nombre de usuario"}
            />

            {/*parte del password */}
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
              styles={styles}
              date={"password"}
              message={"*Debe ingresar su contraseña"}
              placeholder={"Contraseña"}
            />
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
