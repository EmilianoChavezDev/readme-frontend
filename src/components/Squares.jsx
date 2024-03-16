"use client";

import { useState } from "react";
import styles from "../app/favorites/styles/favorites.module.css";
import updateFavoritos from "@/hooks/updateFavorites";
import { useUser } from "@/contexts/UserProvider";
import Link from "next/link";

const Cuadros = ({ data }) => {
  const [favorito, setFavorito] = useState(true);
  const { actualizarFavoritos, error } = updateFavoritos();
  const { token } = useUser();
  let {
    id: libroId,
    portada: imageurl,
    titulo: title,
    autorUsername: author,
    cantidad_lecturas: view,
    cantidad_resenhas: star,
    cantidad_comentarios: comment,
  } = data;

  const fn_btnFavorite = (clickedLibroId) => {
    if (token) {
      actualizarFavoritos(clickedLibroId, !favorito, token)
        .then(() => {
          setFavorito(!favorito);
        })
        .catch(() => {
          console.error("Error al intentar actualizar favoritos:", error);
        });
    }
  };

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
    <div className={styles.contenedor_datos_cuadro}>
      <div
        className={styles.botonContainer}
        onClick={() => fn_btnFavorite(libroId)}
      >
        {favorito ? (
          <button className={styles.btnCorazonLleno}>
            <img src="/image/img_like.png" alt="Corazón lleno" />
          </button>
        ) : (
          <button className={styles.btnCorazonVacio}>
            <img src="/image/img_dislike.png" alt="Corazón vacio" />
          </button>
        )}
      </div>
      <Link href={`/books/${libroId}`}>
        <div>
          <img src={imageurl ? imageurl : "/image/template_libro.png"} />
        </div>
      </Link>
      <div>
        <p className={`${styles.title} ${styles.contenedor_title}`}>{title}</p>
      </div>
      <div>
        <p className={styles.author}>{author}</p>
      </div>
      <div className={styles.group_global}>
        <div className={styles.group_children}>
          <div>
            <img src="/image/img_view.png" alt="imagen ver" />
          </div>
          <div>
            <p>{formatNumber(view)}</p>
          </div>
        </div>
        <div className={styles.group_children}>
          <div>
            <img src="/image/img_star.png" alt="imagen estrella" />
          </div>
          <div>
            <p>{formatNumber(star)}</p>
          </div>
        </div>
        <div className={styles.group_children}>
          <div>
            <img src="/image/img_comment.png" alt="imagen comentar" />
          </div>
          <div>
            <p>{formatNumber(comment)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuadros;
