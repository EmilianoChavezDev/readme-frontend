"use client";

import { useEffect, useState } from "react";
import styles from "../app/favorites/styles/favorites.module.css";
import updateFavoritos from "@/hooks/updateFavorites";
import { useUser } from "@/contexts/UserProvider";
import Link from "next/link";

const Cuadros = ({ libroId, imageurl, title, author, view, star, comment }) => {
  const [favorito, setFavorito] = useState(true);
  const [loading, setLoading] = useState(true);
  const { actualizarFavoritos, error, isLoading } = updateFavoritos();
  const { token, userId } = useUser();

  const fn_btnFavorite = (clickedLibroId) => {
    if (token) {
      actualizarFavoritos(clickedLibroId, userId, !favorito, token)
        .then(() => {
          setFavorito(!favorito);
        })
        .catch(() => {
          console.error("Error al intentar actualizar favoritos:", error);
        });
    }
  };

  useEffect(() => {
    if (token) {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div> CARGANDO... </div>;
  }

  if (imageurl == "") {
    imageurl =
      "http://localhost:3000/_next/image?url=%2Fimage%2Ftemplate_libro.png&w=256&q=75";
  }

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
          <img src={imageurl} />
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
            <img src="/image/img_view.png" alt="imagen ver"></img>
          </div>
          <div>
            <p>{view}</p>
          </div>
        </div>
        <div className={styles.group_children}>
          <div>
            <img src="/image/img_star.png" alt="imagen estrella"></img>
          </div>
          <div>
            <p>{star}</p>
          </div>
        </div>
        <div className={styles.group_children}>
          <div>
            <img src="/image/img_comment.png" alt="imagen comentar"></img>
          </div>
          <div>
            <p>{comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuadros;
