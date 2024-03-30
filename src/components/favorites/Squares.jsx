"use client";

import { useState } from "react";
import styles from "@/app/favorites/styles/favorites.module.css";
import updateFavoritos from "@/hooks/updateFavorites";
import { useUser } from "@/contexts/UserProvider";
import Link from "next/link";
import formatNumber from "@/utils/formatNumber";
import { FaStar, FaEye, FaComment, FaHeart, FaRegHeart } from "react-icons/fa";

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

  return (
    <div className={styles.contenedor_datos_cuadro}>
      <div
        className={styles.botonContainer}
        onClick={() => fn_btnFavorite(libroId)}
      >
        {favorito ? (
          <button>
            <FaHeart size={35} color="#CB2B2B" />
          </button>
        ) : (
          <button>
            <FaRegHeart size={35} color="#CB2B2B" />
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
            <FaEye size={15} color="black" className={styles.img_icons} />
          </div>
          <div>
            <p>{formatNumber({ value: view })}</p>
          </div>
        </div>
        <div className={styles.group_children}>
          <div>
            <FaStar size={15} color="black" className={styles.img_icons} />
          </div>
          <div>
            <p>{formatNumber({ value: star })}</p>
          </div>
        </div>
        <div className={styles.group_children}>
          <div>
            <FaComment size={15} color="black" className={styles.img_icons} />
          </div>
          <div>
            <p>{formatNumber({ value: comment })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuadros;
