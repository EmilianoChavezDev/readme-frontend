"use client";
import React from "react";

import styles from "@/app/drafts/styles/drafts.module.css";
import Image from "next/image";
import moment from "moment";
import toast from "react-hot-toast";

const DraftsContainer = ({ data }) => {
  const { libro, ultimo_capitulo_no_publicado } = data;

  const {
    titulo,
    sinopsis,
    portada,
    adulto,
    cantidad_lecturas,
    cantidad_resenhas,
    puntuacion_media,
    cantidad_comentarios,
    categoria,
    user_id,
    autorUsername,
  } = libro;

  const {
    id: capituloId,
    indice,
    titulo: capituloTitulo,
    contenido,
    next_capitulo_id,
    previous_capitulo_id,
    publicado,
    progreso,
    updated_at,
  } = ultimo_capitulo_no_publicado;

  const formatNumber = (value) => {
    const stringValue = String(value);
    const length = stringValue.length;

    if (length === 4) {
      return (
        stringValue.substring(0, 1) + "." + stringValue.substring(1, 2) + "K"
      );
    } else if (length === 5) {
      return stringValue.substring(0, 2) + "K";
    } else if (length === 6) {
      return stringValue.substring(0, 3) + "K";
    } else if (length === 7) {
      return (
        stringValue.substring(0, 1) + "." + stringValue.substring(1, 3) + "M"
      );
    } else if (length === 8 || length === 9) {
      return stringValue.substring(0, length - 6) + "M";
    } else if (length === 10) {
      return (
        stringValue.substring(0, 1) + "." + stringValue.substring(1, 3) + "B"
      );
    } else if (length >= 11 && length <= 12) {
      return stringValue.substring(0, length - 9) + "B";
    } else if (length > 12) {
      return stringValue.substring(0, 2) + "B+";
    } else {
      return stringValue;
    }
  };
  return (
    <>
      <div className={styles.container_drafts}>
        <div className={styles.image_book_container}>
          <Image
            src={portada ? portada : "/image/template_libro.png"}
            width={120}
            height={160}
            className={styles.image_port}
            alt="Portada De Libro"
            priority={true}
          />
        </div>
        <div className={styles.books_data_container}>
          <p className={styles.title_book}>{titulo}</p>
          <p className={styles.txt_public_parts}>{indice} partes publicadas</p>
          <p className={styles.txt_actualization}>
            Actualizado{" "}
            {moment(new Date(updated_at)).format("MMMM, Do YYYY h:mm a")}
          </p>
          <div className={styles.data_FCV}>
            <div className={styles.dataFCV_container}>
              <Image
                src={"/image/img_view.png"}
                width={15}
                height={15}
                alt="Imagen de Vista"
                priority={true}
              />
              <p className={styles.puntuation}>
                {formatNumber(cantidad_lecturas)}
              </p>
            </div>
            <div className={styles.dataFCV_container}>
              <Image
                src={"/image/img_star.png"}
                width={15}
                height={15}
                alt="Imagen de Favorito"
                priority={true}
              />
              <p className={styles.puntuation}>
                {formatNumber(puntuacion_media)}
              </p>
            </div>
            <div className={styles.dataFCV_container}>
              <Image
                src={"/image/img_comment.png"}
                width={15}
                height={15}
                alt="Imagen de Comentario"
                priority={true}
              />
              <p className={styles.puntuation}>
                {formatNumber(cantidad_comentarios)}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.writting_container}>
          <button
            className={styles.btn_continue_writting}
            onClick={() => {
              toast.error("Pagina Pendiente");
            }}
          >
            Seguir escribiendo
          </button>
        </div>
      </div>
    </>
  );
};

export default DraftsContainer;
