"use client";

import axios from "axios";
import { useState } from "react";

const useUnbanAccount = () => {
  const UNBAN_ACCOUNT_ENDPOINT = "/solicitud_desbaneos";

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
  const getUnbanAccount = async (params) => {
    return handleRequest(() =>
      api.get(UNBAN_ACCOUNT_ENDPOINT, {
        params,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  const restoreAccount = async (id) => {
    return handleRequest(() =>
      api.post(
        `${UNBAN_ACCOUNT_ENDPOINT}/aceptar/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    );
  };

  const rejectAppeal = async (id) => {
    return handleRequest(() =>
      api.post(
        `${UNBAN_ACCOUNT_ENDPOINT}/rechazar/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    );
  };

  const request_Unban = async (email, justificacion) => {
    return handleRequest(() =>
      api.post(
        UNBAN_ACCOUNT_ENDPOINT,
        { email, justificacion },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
    );
  };

  return {
    getUnbanAccount,
    restoreAccount,
    rejectAppeal,
    request_Unban, 
    error,
    isLoading,
  };
};
export default useUnbanAccount;
