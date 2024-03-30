"use client";

import { useEffect, useState } from "react";
import styles from "./styles/favorites.module.css";
import Cuadros from "@/components/favorites/Squares";
import useFavoritos from "@/hooks/useFavorites";
import NavBar from "@/components/NavBar";
import NotFound from "@/components/common/NotFound";
import Loader from "@/components/common/loader";
import { CiSearch } from "react-icons/ci";
import BookNotFound from "@/components/favorites/BookNotFound";
import Pagination from "@/components/common/Pagination";

const PageFavoritos = () => {
  const [filtro, setFiltro] = useState("");
  const [librosFavoritos, setLibrosFavoritos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    traerFavoritosPorUsuario,
    isLoading,
    favoritos,
    isSearchEmpty,
    totalPage,
  } = useFavoritos();

  // traemos todos los favoritos de la primera pagina del usuario
  useEffect(() => {
    traerFavoritosPorUsuario(1, "");
  }, []);

  //Carga mi lista de favoritos
  useEffect(() => {
    setLibrosFavoritos(favoritos);
  }, [favoritos]);

  // para hacer la busqueda de favoritos
  const chargeList = (pagina, busqueda = null) => {
    traerFavoritosPorUsuario(pagina, busqueda);
  };
  //Busca cuando se haga click en buscador
  const handleSearch = () => {
    chargeList(1, filtro);
  };

  // Paginacion
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    chargeList(pageNumber, filtro);
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
                    type="search"
                    placeholder="Buscar en Favoritos"
                    onBlur={(e) => setFiltro(e.target.value)}
                  />
                </div>
                <div className={styles.search_content_button}>
                  <button
                    className={styles.btn_search}
                    onClick={() => handleSearch()}
                  >
                    <CiSearch
                      size={25}
                      className="hover:text-colorHoverPrimario ml-2"
                    />
                  </button>
                  <span className={styles.search_label}>Buscar</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.contenedor_padre_cuadros}>
            <div>
              {librosFavoritos && librosFavoritos.length > 0 ? (
                isSearchEmpty ? (
                  <BookNotFound
                    message={
                      "Lo sentimos, el libro que buscas no está en tus favoritos"
                    }
                  />
                ) : (
                  <div>
                    <div className={styles.contenedor_cuadros}>
                      {librosFavoritos?.map((data) => (
                        <Cuadros key={data.id} data={data} />
                      ))}
                    </div>
                    <div className={styles.pagination}>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPage}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </div>
                )
              ) : (
                <div>
                  <NotFound
                    message={
                      "Parece que tu lista de favoritos está vacía por ahora. "
                    }
                    butMessage={
                      "No te preocupes, sigue explorando nuestra página y descubre algo que te encante."
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
