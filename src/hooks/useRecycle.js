"use client";

import axios from "axios";
import { useState } from "react";

const useRecycle = () => {
  const RECYCLE_ENDPOINT = "/papelera";

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
  const getRecycledBooks = async (params) => {
    return handleRequest(() =>
      api.get(RECYCLE_ENDPOINT, {
        params,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  const getRecycledChapters = async (params) => {
    return handleRequest(() =>
      api.get(`${RECYCLE_ENDPOINT}/capitulos`, {
        params,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  const restoreBook = async (id) => {
    return handleRequest(() =>
      api.put(
        `${RECYCLE_ENDPOINT}/restore/libro/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    );
  };

  const restoreChatper = async (id) => {
    return handleRequest(() =>
      api.put(
        `${RECYCLE_ENDPOINT}/restore/capitulo/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    );
  };
  return {
    getRecycledBooks,
    restoreBook,
    restoreChatper,
    getRecycledChapters,
    error,
    isLoading,
  };
};
export default useRecycle;
