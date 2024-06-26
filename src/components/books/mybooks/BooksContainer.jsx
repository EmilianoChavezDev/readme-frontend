"use client";
import styles from "@/app/books/mybooks/styles/mybooks.module.css";
import OptionBooks from "@/components/books/mybooks/OptionsMenuBooks";
import formatNumber from "@/utils/formatNumber";
import { Tooltip, Typography } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaComment, FaEye, FaStar } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { TbRating18Plus } from "react-icons/tb";

const MyBooksContainer = ({
  libroData,
  isDeleted,
  setIsDeleted,
  canEdit = true,
}) => {
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
    autorUsername,
    adulto,
  } = libroData;

  const toggleOptionBooks = () => {
    setShowOptionMenu(!showOptionMenu);
  };

  const isMyBook = useMemo(() => {
    return localStorage.getItem("username") !== autorUsername;
  });

  return (
    <>
      <div id="book-container" className={styles.container_drafts}>
        <Link href={`/books/${libroId}`}>
          <div className="relative group">
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
            {adulto && (
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="p-2">
                  <TbRating18Plus className="hidden _ultrasm:block text-5xl bg-white rounded-full text-red-500 dark:bg-red-500" />
                </div>
              </div>
            )}
          </div>
        </Link>
        <div className={styles.books_data_container}>
          <p className={styles.title_book}>
            <Link href={"/books/" + libroId}>
              {/* Agregue esto para que no se superpongan las palabras en el titulo. SC .................................*/}
              <Tooltip content={titulo}>
                <Typography
                  variant="h5"
                  color="black"
                  className="mb-2 font-bold leading-[1.5] text-lg w-80 truncate"
                >
                  {titulo}
                </Typography>
              </Tooltip>
            </Link>
          </p>
          <p className={styles.txt_public_parts}>
            {Number(publicados) === 1
              ? `${publicados} parte publicada`
              : `${publicados} partes publicadas`}{" "}
          </p>
          <p className={styles.txt_category}>Categoria: {categoria}</p>
          {isMyBook && (
            <p className={styles.txt_category}>Autor: {autorUsername}</p>
          )}

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
        {canEdit && (
          <div className={styles.write_content}>
            <div className={styles.menu_container}>
              <div>
                {showOptionMenu && (
                  <OptionBooks
                    libroId={libroId}
                    isDeleted={isDeleted}
                    setIsDeleted={setIsDeleted}
                    setShowOptionMenu={setShowOptionMenu}
                  />
                )}
              </div>
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
                id="continue-writing"
                className={styles.btn_continue_writting}
                href={`/books/${libroId}/chapters/write`}
              >
                <span>Seguir escribiendo</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBooksContainer;
