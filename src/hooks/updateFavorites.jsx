"use client";

import { useState } from "react";
import axios from "axios";

const updateFavoritos = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const actualizarFavoritos = async (libro_id, user_id, fav, token) => {
    try {
      console.log("TOKEN 2 : ", token);
      const res = await axios.put(
        `${process.env.API_URL}/favoritos/${libro_id}`,
        {
          libro_id: libro_id,
          user_id: user_id,
          fav: fav,
        },
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

  return { actualizarFavoritos, error, isLoading };
};

export default updateFavoritos;
