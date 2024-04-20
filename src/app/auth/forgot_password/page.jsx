"use client";
import EmailInput from "@/components/common/EmailInput";
import Loading from "@/components/common/Loading";
import { useUser } from "@/contexts/UserProvider";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from "../login/styles/Inicio.module.css";
import styles from "../registrarse/styles/Registrarse.module.css";

const defaultValues = {
  email: "",
};

const page = () => {
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);

  const {
    data,
    error,
    loading,
    register: registro,
    forgotPassword,
  } = useAuth();
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
    if (!formData.email) {
      setIsError(true);
      return;
    }

    formData.role = "usuario";
    setIsError(false);
    await forgotPassword(formData.email);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocusEmail = () => {
    setIsFocusedEmail(true);
  };

  const emailValue = watch("email", "");

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
              {error && (
                <p className="bg-red-500 p-2 text-white font-bold mb-5 mx-0">
                  El correo electrónico proporcionado no existe.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <div className="mt-4 mb-2">
                <EmailInput
                  isFocusedEmail={isFocusedEmail}
                  emailValue={emailValue}
                  styles={style}
                  register={register}
                  trigger={trigger}
                  handleBlur={handleBlur}
                  handleFocusEmail={handleFocusEmail}
                  errors={errors}
                  placeholder={"*Email"}
                  date={"email"}
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
