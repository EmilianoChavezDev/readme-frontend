"use client";

import axios from "axios";
import { useState } from "react";

const useChapters = () => {
  const CAPITULES_ENDPOINT = "/capitulos";
  const BOOK_ENDPOINT = "libro";

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Create an axios instance with the base URL and token
  const api = axios.create({ baseURL: process.env.API_URL });

  const handleRequest = async (requestFunction) => {
    setIsLoading(true);
    try {
      const res = await requestFunction();
      return res.data;
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Functions to interact with the API
  const createChapter = async (params) => {
    return handleRequest(() =>
      api.post(CAPITULES_ENDPOINT, params, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  const getChapterByBook = async (id) => {
    return handleRequest(() =>
      api.get(`${CAPITULES_ENDPOINT}/${BOOK_ENDPOINT}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  const getChapterByID = async (id) => {
    return handleRequest(() =>
      api.get(`${CAPITULES_ENDPOINT}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  const updateChapter = async (id, params) => {
    return handleRequest(() =>
      api.put(`${CAPITULES_ENDPOINT}/${id}`, params, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  const deleteChapter = async (id) => {
    return handleRequest(() =>
      api.delete(`${CAPITULES_ENDPOINT}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  const swapChapter = async (capitulo1Id, capitulo2Id) => {
    return handleRequest(() =>
      api.put(
        `/swap/${CAPITULES_ENDPOINT}`,
        { capitulo1_id: capitulo1Id, capitulo2_id: capitulo2Id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    );
  };

  return {
    createChapter,
    getChapterByBook,
    getChapterByID,
    updateChapter,
    deleteChapter,
    swapChapter,
    error,
    isLoading,
  };
};

export default useChapters;
