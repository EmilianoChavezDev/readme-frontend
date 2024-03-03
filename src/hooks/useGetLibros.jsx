import { useUser } from "@/contexts/UserProvider";
import axios from "axios";
import { useState } from "react";

const useGetLibros = () => {
  const [data, setData] = useState([]);

  const { token } = useUser(); // Corregido: llama a useUser como una función para obtener el token

  const getLibros = async (params) => {
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
    }
  };

  return { getLibros, data };
};

export default useGetLibros;
