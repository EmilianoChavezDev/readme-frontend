import { useUser } from "@/contexts/UserProvider"; // Importa el context UserProvider
import { useState } from "react";
import axios from "axios";

const useLibro = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useUser(); // Obtiene el token del contexto

  const agregarLibro = async (data) => {
    setIsLoading(true); // Inicia el estado de carga
    try {
      const res = await axios.post(`${process.env.API_URL}/libros`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      setError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Devuelve la funcion para agregar un libro, el error y el estado de carga
  return { agregarLibro, error, isLoading };
};

export default useLibro;
