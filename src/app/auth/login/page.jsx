"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/Inicio.module.css";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/contexts/UserProvider";
import Loading from "@/components/common/Loading";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "@/components/common/InputField";
import { Error } from "@/components/common/Error";
import PageTheme from "@/components/common/PageTheme";
import Modal from "@/components/common/modal";
import useUnbanAccount from "@/hooks/useUnbanAccount";

const defaultValues = {
  email: "",
  password: "",
};

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { data, error, loading, errorResponse, login } = useAuth();
  const { login: saveUser } = useUser();
  const {
    request_Unban,
    isLoading: unbanLoading,
    error: unbanError,
  } = useUnbanAccount();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });
  const emailValue = watch("email");

  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [justificacion, setJustificacion] = useState("");
  const [unbanRequested, setUnbanRequested] = useState(false);

  const onSubmit = async (formData) => {
    login(formData);
  };

  useEffect(() => {
    if (!data || error) return;
    saveUser(data);
  }, [data]);

  useEffect(() => {
    if (!errorResponse) return;
    if (errorResponse.error === "Usuario baneado") {
      setShowModal(true);
    }
  }, [errorResponse]);

  const handleBlur = () => {
    setIsFocused(false);
  };
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const handleUnbanRequest = async () => {
    const res = await request_Unban(emailValue, justificacion);
    if (res) {
      setUnbanRequested(true);
      reset(defaultValues);
      setShowConfirmationMessage(true); // Mostrar mensaje de confirmación
    }
  };

  return (
    <PageTheme>
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

          <div className="flex flex-col gap-y-2">
            {/*parte del email */}
            <InputField
              label={"Email"}
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

            {/*parte del password */}
            <div className="relative">
              <InputField
                label={"Contraseña"}
                type={showPassword ? "text" : "password"}
                onBlur={handleBlur}
                register={register}
                name={"password"}
                required={true}
                className="bg-white"
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-2xs px-3">
                *Este campo es requerido
              </p>
            )}
            <div className={styles.content_cambiar_contrasena}>
              <Link href={"/auth/forgot_password"}>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <div className={styles.content_button}>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              id="login-btn"
              disabled={loading}
            >
              {loading ? <Loading /> : "Iniciar Sesión"}
            </button>
            <div className={styles.content_crear_cuenta}>
              <span>¿No tienes cuenta?</span>{" "}
              <Link href={"/auth/registrarse"}>¡Registrate!</Link>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for unban request */}
      <Modal
        open={showModal}
        onHide={() => setShowModal(false)}
        title="Solicitar Desbaneo"
        disableSubmit={!justificacion && !unbanRequested}
        onSave={() => {
          handleUnbanRequest();
          setShowModal(false); // Cerrar modal al guardar la solicitud
        }}
        isLoading={unbanLoading}
      >
        <div className="flex flex-col gap-3">
          {unbanRequested ? (
            <p>Ya has enviado tu solicitud de desbaneo.</p>
          ) : (
            <>
              <p>
                Tu cuenta está actualmente baneada. Puedes solicitar un desbaneo
                ingresando una justificación:
              </p>
              <textarea
                className="border rounded-lg p-3 text-gray-900 border-gray-400 outline-none"
                value={justificacion}
                onChange={(event) => setJustificacion(event.target.value)}
                rows={3}
              />
            </>
          )}
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        open={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        title="Solicitud Enviada"
        disableSubmit={true}
        hideCancelButton={true}
        onSave={() => setShowConfirmationModal(false)}
      >
        <div className="flex flex-col gap-3">
          <p>
            Ya has enviado tu solicitud de desbaneo. Te notificaremos una vez
            que tu solicitud sea revisada.
          </p>
        </div>
      </Modal>
    </PageTheme>
  );
};

export default Page;
