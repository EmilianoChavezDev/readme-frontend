"use client";
import { Error } from "@/components/common/Error";
import InputField from "@/components/common/InputField";
import Loading from "@/components/common/Loading";
import PageTheme from "@/components/common/PageTheme";
import { useUser } from "@/contexts/UserProvider";
import useAuth from "@/hooks/useAuth";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./styles/Registrarse.module.css";

const defaultValues = {
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const Page = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const { data, error, loading, errorResponse, register: registro } = useAuth();
  const { login: saveUser } = useUser();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const emailValue = watch("email");

  const router = useRouter();
  useEffect(() => {
    if (!data || error) return;
    saveUser(data, emailValue);
  }, [data]);

  useEffect(() => {
    if (!errorResponse) return;
  }, [errorResponse]);

  const onSubmit = async (formData) => {
    if (
      !formData.username ||
      !formData.password ||
      !formData.password_confirmation ||
      !formData.email ||
      !formData.fecha_nacimiento
    ) {
      return;
    }

    if (!validarLongitudEmail(formData.email)) {
      errorResponse.error = "Longitud de email invalida";
      return;
    }

    if (!validarFechaNacimiento(formData.fecha_nacimiento)) {
      errorResponse.error = "Debes tener al menos 12 años y no mas de 120 años";
      return;
    }

    formData.role = "usuario";
    const fecha = moment(formData.fecha_nacimiento).format("DD-MM-YYYY");
    formData.fecha_nacimiento = fecha;
    // registro(formData);
    const rest = await registro(formData);
    //router.push(`/auth/email_resend/${email}`);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const validarFechaNacimiento = (fechaNacimiento) => {
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 12);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 120);
    const fechaNacimientoDate = new Date(fechaNacimiento);

    const diferenciaAnhos =
      (currentDate - fechaNacimientoDate) / (1000 * 60 * 60 * 24 * 365);

    return diferenciaAnhos >= 12 && diferenciaAnhos <= 120;
  };

  const validarLongitudEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]{6,}/;
    return regex.test(email);
  };

  const formatErrorMessage = (message) => {
    const keywordIndex = message.indexOf(" ");
    return message.substring(keywordIndex + 1);
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
                  {Array.isArray(errorResponse.error) ? (
                    formatErrorMessage(errorResponse.error[0])
                  ) : (
                    <p>{errorResponse.error}</p>
                  )}
                </Error>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
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
              {errors.username && (
                <p className="px-3 text-red-500 text-2xs">
                  *Este campo es requerido
                </p>
              )}

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

              {errors.email && (
                <p className="px-3 text-red-500 text-2xs">
                  *Este campo es requerido
                </p>
              )}

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

              {errors.password && (
                <p className="px-3 text-red-500 text-2xs">
                  *Este campo es requerido
                </p>
              )}

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

              {errors.password_confirmation && (
                <p className="px-4 text-red-500 text-start text-2xs">
                  *Este campo es requerido
                </p>
              )}

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
              onClick={handleSubmit(onSubmit)}
              id="register-btn"
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
    </PageTheme>
  );
};

export default Page;
