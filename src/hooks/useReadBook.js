const { useState } = require("react");
import axios from "axios";

const useReadBooks = () => {
  const [data, setData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [contentChapter, setContentChapter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentChapterData, setCurrentChapterData] = useState([]);
  const [bookInfo, setBookInfo] = useState();

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
  const getNowChapter = async (idBook, data) => {
    const visor = await changeBookEnd(idBook);
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
      console.log(visor.data.terminado);
      if (visor.data.terminado) {
        postCurrentChapter(data[0].id, idBook, false);
        setChapterData(data[0]);
      } else if (response.data.error) {
        setChapterData(data[0]);
        postCurrentChapter(data[0].id, idBook, false);
      } else {
        setChapterData(response.data.capitulo_actual);
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
      console.log(
        "error al obtener el contenido nuevo",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // para obtener si el libro fue finalizado
  const changeBookEnd = async (idBook) => {
    console.log(idBook);
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const url = `${process.env.API_URL}/lecturas/${idBook}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Cambia el capitulo actual leido del libro
  const postCurrentChapter = async (idChapter, idBook, state) => {
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(
        "error al cambiar el capitulo",
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
    getCurrentChapter,
    currentChapterData,
    postCurrentChapter,
    changeBookEnd,
  };
};

export default useReadBooks;
