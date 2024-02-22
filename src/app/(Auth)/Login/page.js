import React from "react";
import styles from "./styles/Inicio.module.css";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className={styles.content}>
      <div className={styles.content_image}>
        <Image src="/image/img_inicio.png" width={400} height={200} />
      </div>
      <div className={styles.content_login}>
        <div className={styles.content_detalle}>
          <div>
            <h1 className={styles.content_title}>Readme</h1>
          </div>
          <div>
            <div className={styles.content_title_correo}>
              <p>Ingrese su correo electronico</p>
              <input type="text" placeholder="correo o nombre de usuario" />
            </div>
            <div>
              <p>Ingrese su contraseña</p>
              <input type="password" placeholder="contraseña" />
            </div>
          </div>
          <div className={styles.content_button}>
            <button type="submit">Iniciar sesión</button>
            <div className={styles.content_crear_cuenta}>
              <span>No tienes cuenta?</span>{" "}
              <Link href={"/Registrarse "}>Registrate</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
