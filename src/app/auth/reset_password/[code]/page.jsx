"use client";
import { Error } from "@/components/common/Error";
import InputField from "@/components/common/InputField";
import Loading from "@/components/common/Loading";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "../../registrarse/styles/Registrarse.module.css";
import PageTheme from "@/components/common/PageTheme";

const defaultValues = {
  reset_password_code: "",
  password: "",
  password_confirmation: "",
};

const Page = ({ params }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [code, setCode] = useState("");

  const router = useRouter();
  const { error, loading, errorResponse, requestCompleted, resetPassword } =
    useAuth();

  useEffect(() => {
    if (!params.code) return;
    setCode(params.code);
  }, [params.code]);

  useEffect(() => {
    if (!errorResponse) return;
  }, [errorResponse]);

  useEffect(() => {
    if (requestCompleted && !error) {
      router.push("/auth/login");
    }
  }, [requestCompleted, error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (formData) => {
    if (formData.password !== formData.password_confirmation) {
      errorResponse.error = "Las contraseñas no coinciden";
      return;
    }

    if (!validarContrasenha(formData.password)) {
      errorResponse.error =
        "La contraseña debe tener al menos 8 caracteres, una letra y un número";
      return;
    }
    formData.reset_password_code = code;
    resetPassword(formData);
  };

  const validarContrasenha = (contrasenha) => {
    const regex = /^(?=.*\d)[a-zA-Z0-9._%+-]{8,}$/;
    return regex.test(contrasenha);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <PageTheme>
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
              {errorResponse?.error && (
                <Error>
                  <p>{errorResponse.error}</p>
                </Error>
              )}
            </div>

            {/*parte del codigo de verificacion*/}
            <div className="flex flex-col gap-y-2">
              {/*parte de la nueva contraseña */}
              <div className="relative">
                <InputField
                  label={"*Nueva Contraseña"}
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
              {errors.password && (
                <p className="px-3 text-red-500 text-2xs">
                  *Este campo es requerido
                </p>
              )}

              {/*parte del confirmar contraseña*/}
              <div className="relative">
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
              {errors.password_confirmation && (
                <p className="px-4 text-red-500 text-start text-2xs">
                  *Este campo es requerido
                </p>
              )}
            </div>
          </div>
          <div className={styles.content_button_submit}>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              id="register-btn"
              disabled={loading}
            >
              {loading ? <Loading /> : "Cambiar contraseña"}
            </button>
          </div>
          <div />
          <div className={styles.content_button}>
            <div>
              <p>¿Recordaste tu contraseña?</p>
            </div>
            <div className={styles.content_link}>
              <Link href={"/auth/login "}>Iniciar Sesion</Link>
            </div>
          </div>
        </div>
      </div>
    </PageTheme>
  );
};

export default Page;
