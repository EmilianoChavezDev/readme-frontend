import { useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const login = async (body) => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.API_URL}/login`, body);

      if (response.status < 200 || response.status >= 300) {
        throw error;
      }

      const data = await response.data;
      setData(data);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (body) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/register`,
        body
      );

      if (response.status < 200 || response.status >= 300) {
        throw error;
      }

      const data = await response.data;
      setData(data);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  return { data, loading, error, login, register };
};

export default useAuth;
