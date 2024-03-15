const { useState } = require("react");
import axios from "axios";

const useReadBooks = () => {
  const [data, setData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [contentChapter, setContentChapter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newChapterData, setNewChapterData] = useState([]);

  // Trae todos los capitulos del libro
  const getBookById = async (id) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  // Obtiene el capitulo actual del libro
  const getNowChapter = async (id) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const getContentChapter = async (contenido) => {
    setIsLoading(true);
    try {
      const response = await axios.get(contenido);
      setContentChapter(response.data);
    } catch (error) {
      console.log(
        "error al obtener el contenido del capitulo",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const postCurrentChapter = (idChapter, idBook, end) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const url = `${process.env.API_URL}/lecturas`;
      const response = axios.post(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          libro_id: idBook,
          capitulo_id: idChapter,
          terminado: end,
        },
      });
      setNewChapterData(response.data);
    } catch (error) {
      console.log(
        "error al obtener el contenido nuevo",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getBookById,
    data,
    getNowChapter,
    chapterData,
    getContentChapter,
    contentChapter,
    isLoading,
    postCurrentChapter,
    newChapterData,
  };
};

export default useReadBooks;
