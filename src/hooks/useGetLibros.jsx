import { useUser } from "@/contexts/UserProvider";
import axios from "axios";
import { useState } from "react";

const useGetLibros = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useUser(); // Corregido: llama a useUser como una función para obtener el token

  const getLibros = async (params) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.API_URL}/libros`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(true);
    }
  };

  return { getLibros, data };
};

export default useGetLibros;
