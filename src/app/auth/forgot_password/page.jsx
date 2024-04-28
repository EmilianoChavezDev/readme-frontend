"use client";
import { Error } from "@/components/common/Error";
import InputField from "@/components/common/InputField";
import Loading from "@/components/common/Loading";
import { Success } from "@/components/common/Success";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../login/styles/Inicio.module.css";

const defaultValues = {
  email: "",
};

const Page = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos en segundos
  const [timerActive, setTimerActive] = useState(false);

  const { loading, errorResponse, successResponse, forgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (formData) => {
    forgotPassword(formData);
    setIsDisplayed(true);
    setIsButtonDisabled(true);
    setTimerActive(true); // Iniciar el temporizador
  };

  useEffect(() => {
    if (!errorResponse && successResponse) {
      setIsButtonDisabled(false); // Habilitar el botón solo si es un éxito
    }
  }, [errorResponse, successResponse]);

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (timerActive) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      // Cuando el temporizador llega a 0, detiene el temporizador
      if (timeLeft === 0) {
        setTimerActive(false);
        setTimeLeft(20); // Reiniciar el temporizador
      }

      return () => clearTimeout(timer);
    }
  }, [timeLeft, timerActive]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div>
      <div>
        <Image
          src="/image/img_inicio.png"
          width={400}
          height={200}
          alt="Imagen de inicio"
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

          {errorResponse?.error && (
            <Error>
              <p>{errorResponse.error}</p>
            </Error>
          )}

          {successResponse.length >= 1 && (
            <Success>
              <p>{successResponse}</p>
            </Success>
          )}

          <div className="flex flex-col gap-y-2">
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

            {errors.email && (
              <p className="text-red-500 text-2xs px-3">
                *Este campo es requerido
              </p>
            )}
          </div>

          <div className={styles.content_button}>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              id="login-btn"
              disabled={loading || isButtonDisabled}
            >
              {loading ? <Loading /> : "Enviar correo de recuperación"}
            </button>
            {isButtonDisabled && (
              <span className="text-gray-700">
                Volver a enviar el codigo en: {formatTime(timeLeft)}
              </span>
            )}
            <div className={styles.content_crear_cuenta}>
              <span>¿Ya tienes una cuenta?</span>{" "}
              <Link href={"/auth/login"}>¡Inicia Sesion!</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
