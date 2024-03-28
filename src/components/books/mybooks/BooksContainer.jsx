"use client";
import React, { useState } from "react";
import styles from "@/app/mybooks/styles/mybooks.module.css";
import Image from "next/image";
import formatNumber from "@/utils/formatNumber";
import Link from "next/link";
import { MdMoreVert } from "react-icons/md";
import { FaStar, FaEye, FaComment } from "react-icons/fa";
import OptionBooks from "@/components/books/mybooks/OptionsMenuBooks";

const MyBooksContainer = ({ libroData }) => {
  const [showOptionMenu, setShowOptionMenu] = useState(false);

  const {
    id: libroId,
    cantidad_capitulos_publicados: publicados,
    titulo,
    portada,
    cantidad_lecturas,
    puntuacion_media,
    cantidad_comentarios,
    categoria,
  } = libroData;

  const toggleOptionBooks = () => {
    setShowOptionMenu(!showOptionMenu);
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
          <p className={styles.txt_public_parts}>
            {Number(publicados) === 1
              ? `${publicados} parte publicada`
              : `${publicados} partes publicadas`}{" "}
          </p>
          <p className={styles.txt_category}>Categoria: {categoria}</p>
          <div className={styles.data_FCV}>
            <div className={styles.dataFCV_container}>
              <FaEye size={15} color="black" className={styles.img_icons} />
              <p className={styles.puntuation}>
                {formatNumber({ value: cantidad_lecturas })}
              </p>
            </div>
            <div className={styles.dataFCV_container}>
              <FaStar size={15} color="black" className={styles.img_icons} />
              <p className={styles.puntuation}>
                {formatNumber({ value: puntuacion_media })}
              </p>
            </div>
            <div className={styles.dataFCV_container}>
              <FaComment size={15} color="black" className={styles.img_icons} />
              <p className={styles.puntuation}>
                {formatNumber({ value: cantidad_comentarios })}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.writting_container}>
          <div className={styles.menu_container}>
            <div>{showOptionMenu && <OptionBooks libroId={libroId} />}</div>
            <div>
              <button className={styles.btn_menu} onClick={toggleOptionBooks}>
                <MdMoreVert
                  size={25}
                  className="hover:text-colorHoverPrimario"
                />
              </button>
            </div>
          </div>
          <div>
            <Link
              className={styles.btn_continue_writting}
              href={`/books/${libroId}/chapters/write`}
            >
              <span>Seguir escribiendo</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBooksContainer;
