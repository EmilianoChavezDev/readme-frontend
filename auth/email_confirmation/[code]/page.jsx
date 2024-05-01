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
import { FaSmileWink } from "react-icons/fa";

const defaultValues = {
  email_confirmation_code: "",
};

const Page = ({ params }) => {
  const [code, setCode] = useState("");

  const router = useRouter();
  const { error, loading, errorResponse, requestCompleted, emailConfirmation } =
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
      router.push("/auth/setup");
    }
  }, [requestCompleted, error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (formData) => {
    formData.email_confirmation_code = code;
    emailConfirmation(formData);
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

          <div style={{ marginTop: "2rem" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <FaSmileWink size={24} color="#00CC99" style={{ marginBottom: "0.5rem" }} />
                <p>Ya casi estamos listos!</p>
                <p>Presiona el botón para continuar</p>
              </div>
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                id="register-btn"
                disabled={loading}
                style={{ marginTop: "1rem", width: "100%", padding: "0.5rem", backgroundColor: "#00CC99", color: "white", border: "none", borderRadius: "0.5rem" }}
              >
                {loading ? <Loading /> : "Confirmar email"}
              </button>
            
            </div>
          </div>
        </div>
      
    </PageTheme>
  );
};

export default Page;
