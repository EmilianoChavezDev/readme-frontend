'use client'

import { useState } from 'react';
import styles from "./styles/favoritos.module.css";


const cuadros = (key, imageurl, title, author) => {
  const [favorito, setFavorito] = useState(true);

  const fn_btnFavorite = () => {
    setFavorito(!favorito);
  };
  
  return (
    <>
      <div key={key} className={styles.contenedor_datos_cuadro}>
        <div className={styles.botonContainer} onClick={fn_btnFavorite}>
          {favorito ? (
          <button className={styles.btnCorazonLleno}>
            <img src="/image/corazon_lleno.png" alt="Corazón lleno" />
          </button>
          ) : ( <button className={styles.btnCorazonVacio} onClick={fn_btnFavorite}>
            <img src="/image/corazon_vacio.png" alt="Corazón vacio" />
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
    </>
  );
};

const pagefavoritos = () => {
  const datosCuadros = [
    {
      titulo: "Título 1",
      autor: "Autor 1",
      imagenUrl:
        "https://es.web.img3.acsta.net/pictures/14/11/14/11/16/546987.jpg",
    },
    { titulo: "Título 2", autor: "Autor 2", imagenUrl: "url_imagen_2.jpg" },
    { titulo: "Título 3", autor: "Autor 3", imagenUrl: "url_imagen_3.jpg" },
    { titulo: "Título 4", autor: "Autor 4", imagenUrl: "url_imagen_4.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
  ];

  const buscador = () =>{

  }
  
  const cuadrosConDatos = datosCuadros.map(
    ({ titulo, autor, imagenUrl }, index) =>
      cuadros(index, imagenUrl, titulo, autor)
  );

  return (
    <div className={styles.contenedor_global}>
      <div className={styles.contenedor_principal}>
        <div className={styles.barra_principal}>
          <div>
            <h1 className={styles.titulo_favorito}>Mis Favoritos</h1>
          </div>
          <div>
            <div>
              <input
                className={styles.buscador}
                type="text"
                placeholder="Buscar en Favoritos"
              ></input>
            </div>
          </div>
        </div>
        <div className={styles.contenedor_padre_cuadros}>
          <div className={styles.contenedor_cuadros}>{cuadrosConDatos}</div>
        </div>
      </div>
    </div>
  );
};

export default pagefavoritos;
