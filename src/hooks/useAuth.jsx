import axios from "axios";
import { useState } from "react";

const useAuth = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorResponse, setErrorResponse] = useState([]);

  const login = async (body) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/auth/login`,
        body
      );

      if (response.status < 200 || response.status >= 300) {
        throw error;
      }

      const data = await response.data;
      setData(data);
      setError(false);
      setErrorResponse([]);
    } catch (error) {
      setError(true);
      setErrorResponse(error.response.data);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (body) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/auth/register`,
        body
      );

      if (response.status < 200 || response.status >= 300) {
        throw error;
      }

      const data = await response.data;
      setData(data);
      setError(false);
      setErrorResponse([]);
    } catch (error) {
      setError(true);
      setErrorResponse(error.response.data);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.API_URL}/auth/forgot_password?email=${email}`
      );

      if (response.status < 200 || response.status >= 300) {
        throw error;
      }

      const data = await response.data;
      setData(data);
      setError(false);
      setErrorResponse([]);
    } catch (error) {
      setError(true);
      setErrorResponse(error.response.data);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    errorResponse,
    login,
    register,
    forgotPassword,
  };
};

export default useAuth;
