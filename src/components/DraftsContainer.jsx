"use client";
import React from "react";

import styles from "@/app/drafts/styles/drafts.module.css";
import Image from "next/image";
import moment from "moment";
import formatNumber from "@/utils/formatNumber";
import Link from "next/link";

const DraftsContainer = ({ data }) => {
  const { libro, ultimo_capitulo_no_publicado } = data;

  const {
    id: libroId,
    titulo,
    portada,
    cantidad_lecturas,
    puntuacion_media,
    cantidad_comentarios,
  } = libro;

  const { id: capituloId, indice, updated_at } = ultimo_capitulo_no_publicado;

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
                {formatNumber({ value: cantidad_lecturas })}
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
                {formatNumber({ value: puntuacion_media })}
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
                {formatNumber({ value: cantidad_comentarios })}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.writting_container}>
          <Link
            className={styles.btn_continue_writting}
            href={`/books/${libroId}/chapters/write/${capituloId}`}
          >
            Seguir escribiendo
          </Link>
        </div>
      </div>
    </>
  );
};

export default DraftsContainer;
