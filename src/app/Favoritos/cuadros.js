"use client";

import { useEffect, useState } from "react";
import styles from "./styles/favoritos.module.css";

const Cuadros = ({ id, imageurl, title, author }) => {
  const [favorito, setFavorito] = useState(true);

  const fn_btnFavorite = () => {
    setFavorito(!favorito);
  };

  return (
    <div key={id} className={styles.contenedor_datos_cuadro}>
      <div className={styles.botonContainer} onClick={fn_btnFavorite}>
        {favorito ? (
          <button className={styles.btnCorazonLleno}>
            <img src="/image/img_like.png" alt="Corazón lleno" />
          </button>
        ) : (
          <button className={styles.btnCorazonVacio} onClick={fn_btnFavorite}>
            <img src="/image/img_dislike.png" alt="Corazón vacio" />
          </button>
        )}
      </div>
      <div>
        <img src={imageurl}></img>
      </div>
      <div>
        <p className={styles.title}>{title}</p>
      </div>
      <div>
        <p className={styles.author}>{author}</p>
      </div>
    </div>
  );
};

export default Cuadros;
