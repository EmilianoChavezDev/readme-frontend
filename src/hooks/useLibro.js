import { useUser } from "@/contexts/UserProvider"; // Importa el context UserProvider
import { useState } from "react";
import axios from "axios";

const useLibro = () => {
  const [error, setError] = useState(false);
  const { token } = useUser(); // Obtiene el token del contexto

  const agregarLibro = async (data) => {
    try {
      const res = await axios.post(`${process.env.API_URL}/libros`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status < 200 || res.status >= 300) {
        throw error;
      }

      return res.data;
    } catch (error) {
      setError(true);
      return null;
    }
  };

  return { agregarLibro, error };
};

export default useLibro;
