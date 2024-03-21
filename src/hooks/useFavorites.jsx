"use client";
import { useState } from "react";
import axios from "axios";

const useFavoritos = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const traerFavoritosPorUsuario = async (
    user_id,
    page,
    token,
    busqueda = null
  ) => {
    try {
      const params = {
        user_id: user_id,
        page: page,
      };

      if (busqueda) {
        params.busqueda = busqueda;
      }

      const res = await axios.get(`${process.env.API_URL}/favoritos/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params,
      });
      return res.data;
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return { traerFavoritosPorUsuario, error, isLoading };
};

export default useFavoritos;
