"use client";

import { useEffect, useState } from "react";
import styles from "./styles/favoritos.module.css";
import cuadros from "./cuadros.js";

const pagefavoritos = () => {
  const [filtro, setFiltro] = useState("");

  const datosCuadros = [
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Título 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
  ];

  const cuadrosConDatos = datosCuadros.map(
    ({ titulo, autor, imagenUrl }, index) =>
      cuadros(index, imagenUrl, titulo, autor)
  );

  useEffect(() => {
    if (filtro.length > 3) {
      handleSearchBooks();
    }
  }, [filtro]);

  const cuadrosDatosFiltrodos = datosCuadros
    .filter(({ titulo, autor }) => {
      const lowerCaseTitulo = titulo.toLowerCase();
      const lowerCaseAutor = autor.toLowerCase();
      const lowerCaseFiltro = filtro.toLowerCase();

      return (
        lowerCaseTitulo.includes(lowerCaseFiltro) ||
        lowerCaseAutor.includes(lowerCaseFiltro)
      );
    })
    .map(({ titulo, autor, imagenUrl }, index) =>
      cuadros(index, imagenUrl, titulo, autor)
    );

  const handleSearchBooks = () => {
    console.log(filtro);
  };

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
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className={styles.contenedor_padre_cuadros}>
          <div className={styles.contenedor_cuadros}>
            {filtro ? cuadrosConDatos : cuadrosDatosFiltrodos}
          </div>
        </div>
      </div>
    </div>
  );
};

export default pagefavoritos;
