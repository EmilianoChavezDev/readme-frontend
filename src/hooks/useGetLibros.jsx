import { useUser } from "@/contexts/UserProvider";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetLibros = () => {
  const [data, setData] = useState([]);
  const { token } = useUser();

  const getLibros = async (params) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/libros`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params
      });
      console.log(response.data);
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return { getLibros, data };
};

export default useGetLibros;
