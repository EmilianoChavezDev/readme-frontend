"use client";
import { useState } from "react";
import axios from "axios";

const useFavoritos = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  const traerFavoritosPorUsuario = async (page, busqueda = null) => {
    setIsSearchEmpty(false);
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    try {
      const params = {
        user_id: user_id,
        page: page,
      };

      if (busqueda != null) {
        params.busqueda = busqueda;
      }

      const response = await axios.get(
        `${process.env.API_URL}/favoritos/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: params,
        }
      );
      if (
        busqueda != null &&
        Array.isArray(response.data.favoritos) &&
        response.data.favoritos.length > 0
      ) {
        setFavoritos(response.data.favoritos);
        setTotalPage(response.data.total_pages);
      } else {
        setIsSearchEmpty(true);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return {
    traerFavoritosPorUsuario,
    error,
    isLoading,
    favoritos,
    isSearchEmpty,
    totalPage,
  };
};

export default useFavoritos;
