"use client";

import { useEffect, useState } from "react";
import styles from "./styles/favorites.module.css";
import Cuadros from "@/components/Squares";
import useFavoritos from "@/hooks/useFavorites";
import { useUser } from "@/contexts/UserProvider";
import NavBar from "@/components/NavBar";
import NotFound from "@/components/SearchFavoritesNotFound";

const PageFavoritos = () => {
  const [filtro, setFiltro] = useState("");
  const [librosFavoritos, setLibrosFavoritos] = useState([]);
  const { traerFavoritosPorUsuario, error, isLoading } = useFavoritos();
  const { token, userId } = useUser();

  const chargeList = async (pagina = 1) =>
    await traerFavoritosPorUsuario(userId, pagina, token)
      .then((favoritos) => {
        console.log(favoritos);
        setLibrosFavoritos(favoritos);
      })
      .catch(() => {
        console.error("Error al traer favoritos:", error);
      });
  useEffect(() => {
    const pagina = 1;
    if (token) {
      chargeList(pagina);
    }
  }, [token]);

  const filterCallback = ({ titulo, autorUsername }) => {
    const lowerCaseTitulo = titulo ? titulo.toLowerCase() : "";
    const lowerCaseAutor = autorUsername ? autorUsername.toLowerCase() : "";
    const lowerCaseFiltro = filtro.toLowerCase();

    return (
      lowerCaseTitulo.includes(lowerCaseFiltro) ||
      lowerCaseAutor.includes(lowerCaseFiltro)
    );
  };

  if (isLoading) {
    return <div> CARGANDO... </div>;
  }

  return (
    <>
      <NavBar />
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
            {librosFavoritos?.filter(filterCallback).length === 0 ? (
              <NotFound />
            ) : (
              <div className={styles.contenedor_cuadros}>
                {librosFavoritos
                  ?.filter(filterCallback)
                  ?.map(
                    ({
                      id,
                      titulo,
                      autorUsername,
                      portada,
                      cantidad_lecturas,
                      puntuacion_media,
                      cantidad_comentarios,
                      token,
                      userId,
                    }) => (
                      <Cuadros
                        key={id}
                        libroId={id}
                        imageurl={portada}
                        title={titulo}
                        author={autorUsername}
                        view={cantidad_lecturas}
                        star={puntuacion_media}
                        comment={cantidad_comentarios}
                        token={token}
                        userId={userId}
                      />
                    )
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageFavoritos;
