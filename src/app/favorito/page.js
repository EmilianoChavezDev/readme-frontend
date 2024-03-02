"use client";

import { useEffect, useState } from "react";
import styles from "./styles/favoritos.module.css";
import Cuadros from "./cuadros.js";
import useFavoritos from "./hooks/useFavoritos";
import { useUser } from "@/contexts/UserProvider";

const PageFavoritos = () => {
  const [filtro, setFiltro] = useState("");
  const [librosFavoritos, setLibrosFavoritos] = useState([]);
  const { traerFavoritosPorUsuario, error, isLoading } = useFavoritos();
  const { token, userId } = useUser();

  useEffect(() => {
    const pagina = 1;
    if (token) {
      traerFavoritosPorUsuario(userId, pagina, token)
        .then((favoritos) => {
          setLibrosFavoritos(favoritos);
          console.log(favoritos);
        })
        .catch(() => {
          console.error("Error al traer favoritos:", error);
        });
    }
  }, [token]);

  const cuadrosFiltrados = librosFavoritos.filter(({ titulo, autor }) => {
    const lowerCaseTitulo = titulo ? titulo.toLowerCase() : "";
    const lowerCaseAutor = autor ? autor.toLowerCase() : "";
    const lowerCaseFiltro = filtro.toLowerCase();

    return (
      lowerCaseTitulo.includes(lowerCaseFiltro) ||
      lowerCaseAutor.includes(lowerCaseFiltro)
    );
  });

  if (isLoading) {
    return <div> CARGANDO... </div>;
  }

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
              />
            </div>
          </div>
        </div>
        <div className={styles.contenedor_padre_cuadros}>
          <div className={styles.contenedor_cuadros}>
            {cuadrosFiltrados.map(({ titulo, autor, portada,cantidad_lecturas,puntuacion_media, cantidad_comentarios}, id) => (
              <Cuadros
                key={id}
                imageUrl={portada}
                title={titulo}
                author={autor}
                view={cantidad_lecturas}
                star={puntuacion_media}
                comment={cantidad_comentarios}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFavoritos;
