const { useUser } = require("@/contexts/UserProvider");
const { useState, useEffect } = require("react");
import axios from "axios";
import { set } from "react-hook-form";

const useReadBooks = () => {
  const [data, setData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [contentChapter, setContentChapter] = useState("");

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

  const getContentChapter = async (contenido) => {
    console.log(contenido);
    try {
      const response = await axios(contenido);
      setChapterData(response.data.text);
    } catch (error) {
      console.log(
        "error al obtener el contenido del capitulo",
        error.response ? error.response.data : error.message
      );
    }
  };

  return {
    getBookById,
    data,
    getNowChapter,
    chapterData,
    getContentChapter,
    contentChapter,
  };
};

export default useReadBooks;
