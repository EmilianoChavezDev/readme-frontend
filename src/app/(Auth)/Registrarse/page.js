import React from "react";
import styles from "../../../styles/Registrarse.module.css";
import Image from "next/image";
import Link from "next/link";
const page = () => {
  return (
    <div className={styles.content}>
      <div className={styles.content_image}>
        <Image src="/image/img_inicio.png" width={400} height={200} />
      </div>
      <div className={styles.content_registrarse}>
        <div className={styles.content_detalle}>
          <div className={styles.content_informacion}>
            <div className={styles.content_title_correo}>
              <p>Nombre de usuario</p>
              <input type="text" placeholder="nickname" />
            </div>
            <div>
              <p>Correo electrónico</p>
              <input type="email" placeholder="example@email.com" />
            </div>
            <div>
              <p>Nueva contraseña</p>
              <input type="password" placeholder="contraseña nueva" />
            </div>
            <div>
              <p>Confirmar la contraseña</p>
              <input type="password" placeholder="confirmar contraseña" />
            </div>
            <div className={styles.content_date}>
              <p>Fecha de nacimiento</p>
              <input type="date" />
            </div>
          </div>
          <div className={styles.content_button_submit}>
            <button type="submit">Registrarte</button>
          </div>

          <div />
          <div className={styles.content_button}>
            <p>¿Tienes una cuenta?</p>
            <Link href={"/Login"}>Iniciar Sesion</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
