import { useState } from "react";
import axios from "axios";

const useUserInfo = () => {
  const [data, setData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUserInformation = async (username) => {
    setLoading(true);
    const url = `${process.env.API_URL}/usersFind/${username}`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  const updateUsername = async (newUsername, password) => {
    setLoading(true);
    const url = `${process.env.API_URL}/users/username`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        url,
        {
          username: newUsername,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setCurrentData(response.data.user);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (
    oldPassword,
    newPassword,
    confirmNewPassword
  ) => {
    setLoading(true);
    const url = `${process.env.API_URL}/users/password`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        url,
        {
          current_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    getUserInformation,
    updateUsername,
    currentData,
    updatePassword,
    message,
  };
};

export default useUserInfo;
