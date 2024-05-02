"use client";


import InputField from "@/components/common/InputField";
import Loading from "@/components/common/Loading";
import { Success2 } from "@/components/common/Succes2";

import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../login/styles/Inicio.module.css";
import { Tooltip } from "@material-tailwind/react";
import { AiTwotoneMail } from "react-icons/ai";

const defaultValues = {
  email: "",
};

const EmailResend = ({ params }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [email, setEmail] = useState("");

  const { loading, errorResponse, success2Response, resendEmail } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    if (!params.email) return;
    setEmail(params.email);
  }, [params.email]);

  const onSubmit = async (formData) => {
    formData.email = email;

    resendEmail(formData);
    setIsDisplayed(true);
  };

  useEffect(() => {
    if (!errorResponse) return;
  }, [errorResponse]);

  useEffect(() => {
    if (!success2Response) return;
  }, [success2Response]);

  const handleBlur = () => {
    setIsFocused(false);
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
      {errorResponse?.error && (
            <Error>
              <p>{errorResponse.error}</p>
            </Error>
          )}

          {success2Response.length >= 1 && (
            <Success2>
              <p>{success2Response}</p>
            </Success2>
          )}
        <div className={styles.content_detalle}>
          <div className={styles.content_logo}>
            <Image
              src={"/image/g2.png"}
              alt="imagen logo"
              width={250}
              height={250}
            />
          </div>

          
          <div className="text-center font-bold text-xl text-gray-700 pt-4">
            <p>Confirma tu dirección de correo electrónico.</p>
          </div>

          <label className="flex items-center justify-center">
            <AiTwotoneMail size={300} color="gray" />
          </label>
          <div className="text-center font-bold text-gray-700 pb-4">
            <p>
              Enviamos un código de confirmación al correo electrónico que
              proporcionaste. ¡Revisa tu correo!
            </p>
          </div>

          <div className="text-center">
            <div
              className="font-semibold text-sm text-gray-500"
              style={{ marginBottom: "5px" }}
            >
              <p>No recibiste el correo electrónico?</p>
            </div>

            {/* <div className={styles.content_button}> */}
            <div className="text-center">
              <button
                className="py-2 px-6 mx-6 mb-4 lg:mb-0 text-white bg-colorPrimario rounded-md"
                onClick={handleSubmit(onSubmit)}
              >
                Volver a enviar codigo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailResend;
