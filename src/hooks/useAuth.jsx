import axios from "axios";
import { useState } from "react";

const useAuth = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successResponse, setSuccessResponse] = useState([]);
  const [errorResponse, setErrorResponse] = useState([]);
  const [requestCompleted, setRequestCompleted] = useState(false);

  const [success2Response, setSuccess2Response] = useState([]);

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
      return data;
    } catch (error) {
      setError(true);

      if (error.response) {
        setErrorResponse(error.response.data);
      } else {
        // Manejar el caso en el que no hay una respuesta de error definida
        console.error("No hay respuesta de error definida");
      }
      setLoading(false);
      return error.response.data;
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

  const forgotPassword = async ({ email }) => {
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
      setSuccessResponse(data.message);
      setError(false);
      setErrorResponse([]);
    } catch (error) {
      setError(true);
      setSuccessResponse([]);
      setErrorResponse(error.response.data);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // la primera vez al registrarse igual funciona, en el undefine
  const resendEmail = async ({ email }) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.API_URL}/auth/resent_email_confirmation?email=${email}`
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to resend email confirmation");
      }
      const data = await response.data;
      setData(data);
      setSuccess2Response("Se volvió a enviar el correo de confirmación");
      setError(false);
      setErrorResponse([]);
    } catch (error) {
      setError(true);
      setSuccess2Response([]);
      setErrorResponse(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async ({
    reset_password_code,
    password,
    password_confirmation,
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/auth/reset_password`,
        {
          reset_password_code,
          password,
          password_confirmation,
        }
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to reset password");
      }
      const data = await response.data;
      setData(data);
      setSuccessResponse(data.message);
      setError(false);
      setErrorResponse([]);
      setRequestCompleted(true);
    } catch (error) {
      setError(true);
      setSuccessResponse([]);
      setErrorResponse(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const emailConfirmation = async (params) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/auth/email_confirmation`,
        params,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to reset password");
      }

      const data = await response.data;
      setData(data);
      setSuccessResponse(data.message);
      setError(false);
      setErrorResponse([]);
      setRequestCompleted(true);
    } catch (error) {
      setError(true);
      setSuccessResponse([]);
      setErrorResponse(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,

    errorResponse,
    successResponse,

    success2Response,
    requestCompleted,
    login,
    register,
    forgotPassword,
    resendEmail,
    resetPassword,
    emailConfirmation,
  };
};

export default useAuth;