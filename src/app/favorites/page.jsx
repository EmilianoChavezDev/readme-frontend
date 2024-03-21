"use client";

import { useEffect, useState } from "react";
import styles from "./styles/favorites.module.css";
import Cuadros from "@/components/Squares";
import useFavoritos from "@/hooks/useFavorites";
import { useUser } from "@/contexts/UserProvider";
import NavBar from "@/components/NavBar";
import NotFound from "@/components/common/NotFound";
import Loader from "@/components/common/loader";
import Image from "next/image";

const PageFavoritos = () => {
  const [filtro, setFiltro] = useState("");
  const [librosFavoritos, setLibrosFavoritos] = useState([]);
  const { traerFavoritosPorUsuario, error, isLoading } = useFavoritos();
  const { token } = useUser();

  const chargeList = async (user_id, pagina = 1, busqueda) => {
    try {
      const favoritos = await traerFavoritosPorUsuario(
        user_id,
        pagina,
        token,
        busqueda
      );
      setLibrosFavoritos(favoritos);
    } catch (error) {
      console.error("Error al traer favoritos:", error);
    }
  };

  useEffect(() => {
    const pagina = 1;
    if (token) {
      let user_id = localStorage.getItem("user_id");
      chargeList(user_id, pagina);
    }
  }, [token, filtro]);

  const handleSearch = () => {
    if (token) {
      let user_id = localStorage.getItem("user_id");
      chargeList(user_id, 1, filtro);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <NavBar />
      <div className={styles.contenedor_global}>
        <div className={styles.contenedor_principal}>
          <div className={styles.barra_principal}>
            <div>
              <h1 className={styles.titulo_favorito}>Mis Favoritos</h1>
            </div>
            <div>
              <div className={styles.container_search}>
                <div>
                  <input
                    className={styles.buscador}
                    type="text"
                    placeholder="Buscar en Favoritos"
                    onBlur={(e) => setFiltro(e.target.value)}
                  />
                </div>
                <div>
                  <button className={styles.btn_search} onClick={handleSearch}>
                    <Image
                      src="/image/lupa.png"
                      width={35}
                      height={35}
                      className={styles.image_port}
                      alt="search"
                      priority={true}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.contenedor_padre_cuadros}>
            <div>
              {librosFavoritos && librosFavoritos.length > 0 ? (
                <div className={styles.contenedor_cuadros}>
                  {librosFavoritos?.map((data, index) => (
                    <Cuadros key={index} data={data} />
                  ))}
                </div>
              ) : (
                <div>
                  <NotFound
                    message={
                      " ¡Vaya! Parece que no se encuentra ningún libro favorito."
                    }
                    butMessage={
                      " Pero no te preocupes, puedes seguir navegando a través de la página y encontrar algo que te guste. "
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageFavoritos;
