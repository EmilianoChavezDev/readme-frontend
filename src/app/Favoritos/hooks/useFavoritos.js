"use client";
import React, { useState } from "react";
import { useUser } from "@/contexts/UserProvider"; // Importa el context UserProvider
import axios from "axios";

const useFavoritos = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useUser();

  const traerFavoritosPorUsuario = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.API_URL}/favoritos/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
