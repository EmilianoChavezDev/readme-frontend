"use client";

import axios from "axios";
import { useState } from "react";

const useDenuncias = () => {
  const COMMENTS_ENDPOINT = "/reportes/categorias/comentarios";
  const BOOKS_ENDPOINT = "/reportes/categorias/libros";
  const COMMETS_CREATE_REPORT = "/reportes_comentarios";
  const BOOK_CREATE_REPORT = "/reportes_libros";
  const USER_ENDPOINT = "/reportes/categorias/usuarios";
  const USER_CREATE_REPORT = "/reportes_usuarios";
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
  const getReportCommentCategory = async () => {
    return handleRequest(() =>
      api.get(COMMENTS_ENDPOINT, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  const getReportBookCategory = async () => {
    return handleRequest(() =>
      api.get(BOOKS_ENDPOINT, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  const getReportUserCategory = async () => {
    return handleRequest(() =>
      api.get(USER_ENDPOINT, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  const createReportComment = async (params) => {
    return handleRequest(() =>
      api.post(COMMETS_CREATE_REPORT, params, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  const createReportBook = async (params) => {
    return handleRequest(() =>
      api.post(BOOK_CREATE_REPORT, params, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  const createReportUser = async (params) => {
    return handleRequest(() =>
      api.post(USER_CREATE_REPORT, params, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  return {
    getReportBookCategory,
    getReportCommentCategory,
    createReportComment,
    createReportBook,
    getReportUserCategory,
    createReportUser,
    error,
    isLoading,
  };
};

export default useDenuncias;
