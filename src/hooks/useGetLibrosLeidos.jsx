import { useUser } from "@/contexts/UserProvider";
import axios from "axios";
import { useState } from "react";

const useGetLibrosLeidos = () => {
  const [data, setData] = useState([]);

  const { token } = useUser(); 

  const getLibrosLeidos = async (params) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/libros_en_progreso`, {
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

  return { getLibrosLeidos, data };
};

export default useGetLibrosLeidos;