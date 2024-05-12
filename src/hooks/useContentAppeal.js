"use client";

import axios from "axios";
import { useState } from "react";

const useContentAppeal = () => {
  const APPEAL_ENDPOINT = "/solicitud_restauracion";

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");

  // Create an axios instance with the base URL and token
  const api = axios.create({ baseURL: process.env.API_URL });

  const handleRequest = async (requestFunction) => {
    setIsLoading(true);
    try {
      const res = await requestFunction();
      return res.data;
    } catch (error) {
      setError(true);

      setErrorResponse(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  // Functions to interact with the API

  const getAllAppeals = async (params = {}) => {
    console.log(params);
    return handleRequest(() =>
      api.get(`${APPEAL_ENDPOINT}/`, {
        params,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  const postBookAppeal = async (id, justificacion) => {
    return handleRequest(() =>
      api.post(
        `${APPEAL_ENDPOINT}/libro/${id}`,
        { justificacion },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    );
  };

  const postCommentAppeal = async (id, justificacion) => {
    return handleRequest(() =>
      api.post(
        `${APPEAL_ENDPOINT}/comentario/${id}`,
        { justificacion },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    );
  };

  const postAcceptAppeal = async (id) => {
    return handleRequest(() =>
      api.post(
        `${APPEAL_ENDPOINT}/aceptar/${id}`,
        { id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    );
  };

  const postRejectAppeal = async (id) => {
    return handleRequest(() =>
      api.post(
        `${APPEAL_ENDPOINT}/rechazar/${id}`,
        { id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    );
  };

  return {
    getAllAppeals,
    postBookAppeal,
    postAcceptAppeal,
    postCommentAppeal,
    postRejectAppeal,
    setError,
    error,
    isLoading,
    errorResponse,
  };
};

export default useContentAppeal;
