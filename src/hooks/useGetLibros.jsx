import axios from "axios";
import { useState } from "react";

const useGetLibros = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLibros = async (params) => {
    const token = localStorage.getItem("token");
    setLoading(true);
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
      setLoading(false);
    }
  };

  return { getLibros, data, loading };
};

export default useGetLibros;
