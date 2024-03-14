const { useUser } = require("@/contexts/UserProvider");
const { useState, useEffect } = require("react");
import axios from "axios";

const useReadBooks = () => {
  const [data, setData] = useState([]);
  const [chapterData, setChapterData] = useState([]);

  // Trae todos los capitulos del libro
  const getBookById = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const url = `${process.env.API_URL}/capitulos/libro/${id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error(
        "Error al obtener el libro:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Obtiene el capitulo actual del libro
  const getNowChapter = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const url = `${process.env.API_URL}/capitulo_actual`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          libro_id: id,
        },
      });
      setChapterData(response.data);
    } catch (error) {
      console.error(
        "Error al obtener el capitulo:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getContentChapter = async () => {
    const token = localStorage.getItem("token");
    
  };

  return { getBookById, data, getNowChapter, chapterData };
};

export default useReadBooks;
