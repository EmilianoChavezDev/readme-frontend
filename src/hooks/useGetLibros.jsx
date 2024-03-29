import axios from "axios";
import { useState } from "react";

const useGetLibros = () => {
  const [data, setData] = useState([]);
  const [dataContinueReading, setDataContinueReading] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBooks = async (params) => {
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

  const getContinueReading = async (page) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.API_URL}/libros_en_progreso`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDataContinueReading(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return { getBooks, getContinueReading, dataContinueReading, data, loading };
};

export default useGetLibros;
