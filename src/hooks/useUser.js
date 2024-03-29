import { useState } from "react";
import axios from "axios";

const useUserInfo = () => {
  const [data, setData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [isTrueBirthay, setIsTrueBirthay] = useState(false);
  const [isImageChange, setIsImageChange] = useState(false);

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
    } catch (error) {
      setIsError(true);
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
      setIsTrue(true);
      setCurrentData(response.data.user);
      setMessage(response.data.message);
    } catch (error) {
      setIsError(true);
      console.log(error);
      setMessage(error.response.data.error);
      console.log(isError);
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
      setIsTrue(true);
      setMessage(response.data.message);
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (file) => {
    setLoading(true);
    const url = `${process.env.API_URL}/users/profile`;
    const token = localStorage.getItem("token");

    // Crear un objeto FormData
    const formData = new FormData();
    formData.append("profile", file);

    try {
      const response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsImageChange(true);
      setCurrentData(response.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const updateBirthday = async (username, newBirthday) => {
    setLoading(true);
    const url = `${process.env.API_URL}/users/birthday`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        url,
        {
          username: username,
          fecha_de_nacimiento: newBirthday,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsTrueBirthay(true);
      setCurrentData(response.data);
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProfile = async () => {
    setLoading(true);
    const url = `${process.env.API_URL}/users/delete_profile`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        url,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentData(response.data);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    isError,
    getUserInformation,
    updateUsername,
    currentData,
    updatePassword,
    message,
    isTrue,
    updateProfile,
    isImageChange,
    updateBirthday,
    isTrueBirthay,
    deleteProfile,
  };
};

export default useUserInfo;
