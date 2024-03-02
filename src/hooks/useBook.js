import { useUser } from "@/contexts/UserProvider"; // Importa el context UserProvider
import { useState } from "react";
import axios from "axios";

const useBook = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useUser(); // Obtiene el token del contexto

  // Crear un libro
  const createBook = async (data) => {
    setIsLoading(true); // Inicia el estado de carga
    try {
      const res = await axios.post(`${process.env.API_URL}/libros`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      setError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Obtener todos los libros
  const getAllBooks = async () => {
    setIsLoading(true); // Inicia el estado de carga
    try {
      const res = await axios.get(`${process.env.API_URL}/libros`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      setError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Obtener un libro por su id
  const getBookByID = async (id) => {
    setIsLoading(true); // Inicia el estado de carga
    try {
      const res = await axios.get(`${process.env.API_URL}/libros/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      setError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Actualizar un libro por su id
  const updateBook = async (id, data) => {
    setIsLoading(true); // Inicia el estado de carga
    try {
      const res = await axios.put(`${process.env.API_URL}/libros/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      setError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar un libro por su id
  const deleteBook = async (id) => {
    setIsLoading(true); // Inicia el estado de carga
    try {
      const res = await axios.delete(`${process.env.API_URL}/libros/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      setError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Devuelve las funciones, y los estados de error y carga
  return {
    createBook,
    getAllBooks,
    getBookByID,
    updateBook,
    deleteBook,
    error,
    isLoading,
  };
};

export default useBook;
