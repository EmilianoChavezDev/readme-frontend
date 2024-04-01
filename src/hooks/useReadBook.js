const { useState } = require("react");
import axios from "axios";

const useReadBooks = () => {
  const [data, setData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [contentChapter, setContentChapter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentChapterData, setCurrentChapterData] = useState([]);

  const getReadBook = async (params) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const url = `${process.env.API_URL}/lecturas_libro_id`;
      const response = await axios.get(url, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

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
    } finally {
      setIsLoading(false);
    }
  };

  // Obtiene el capitulo actual del libro
  const getNowChapter = async (idBook, data) => {
    const isEnd = await changeBookEnd(idBook);
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const url = `${process.env.API_URL}/capitulo_actual`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          libro_id: idBook,
        },
      });
      if (response.data.error) {
        setChapterData(data[0]);
        postCurrentChapter(data[0].id, idBook, false, false);
      } else if (isEnd) {
        setChapterData(data[0]);
        postCurrentChapter(data[0].id, idBook, false, true);
      } else {
        setChapterData(response.data.capitulo_actual);
        postCurrentChapter(response.data.capitulo_actual.id, idBook, false);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // para descargar el contenido del capitulo
  const getContentChapter = async (contenido) => {
    setIsLoading(true);
    try {
      const response = await axios.get(contenido);
      setContentChapter(response.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // para obtener el capitulo segun el id del capitulo
  const getCurrentChapter = async (idChapter) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const url = `${process.env.API_URL}/capitulos/${idChapter}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentChapterData(response.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // para obtener si el libro fue finalizado
  const changeBookEnd = async (idBook) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const url = `${process.env.API_URL}/lecturas_libro_id/?libro_id=${idBook}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Cambia el capitulo actual leido del libro
  const postCurrentChapter = async (idChapter, idBook, state, leido) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const url = `${process.env.API_URL}/lecturas`;
      const response = await axios.post(
        url,
        {
          libro_id: idBook,
          capitulo_id: idChapter,
          terminado: state,
          leido: leido,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await changeNowChapter(idBook);
      return response.data;
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Obtiene el capitulo actual del libro
  const changeNowChapter = async (idBook) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const url = `${process.env.API_URL}/capitulo_actual`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          libro_id: idBook,
        },
      });
      setChapterData(response.data.capitulo_actual);
    } catch (error) {
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
    getCurrentChapter,
    currentChapterData,
    postCurrentChapter,
    changeBookEnd,
    getReadBook,
  };
};

export default useReadBooks;
