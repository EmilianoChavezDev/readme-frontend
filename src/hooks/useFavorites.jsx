"use client";

import { useState } from "react";
import axios from "axios";

const useFavoritos = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const traerFavoritosPorUsuario = async (user_id, page, token) => {
    try {
      const res = await axios.get(`${process.env.API_URL}/favoritos/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_id: user_id,
          page: page,
        },
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
