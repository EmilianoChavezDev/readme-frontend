import { useState } from "react";
import axios from "axios";

const useUserInfo = () => {
  const [data, setData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [isImageChange, setIsImageChange] = useState(false);
  const [isErrorProfile, setIsErrorProfile] = useState(false);
  const [isErrorProfileUpdate, setIsErrorProfileUpdate] = useState(false);

  const getUserInformation = async (username) => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
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
      setIsTrue(false);
      setIsError(true);
      setLoading(false);
    } finally {
      setLoading(false);
      setIsError(false);
    }
  };

  const getFollowFollowers = async (user_id) => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
    const url = `${process.env.API_URL}/cantseguidores`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_id: user_id,
        },
      });
      setData(response.data);
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setLoading(false);
    } finally {
      setLoading(false);
      setIsError(false);
    }
  };

  const getUserLecturas = async (page, user_id) => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
    const url = `${process.env.API_URL}/lecturas/lista_lecturas`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
          user_id: user_id,
        },
      });
      setData(response.data);
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setLoading(false);
    } finally {
      setLoading(false);
      setIsError(false);
    }
  };

  const updateUsername = async (newUsername, password) => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
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
      setIsError(false);
      setCurrentData(response.data.user);
      setMessage("Datos actualizado con exito");
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setMessage(error.response.data.error);
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
    setIsTrue(false);
    setIsError(false);
    const url = `${process.env.API_URL}/users/password`;
    const token = localStorage.getItem("token");
    try {
      await axios.put(
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
      setIsError(false);
      setMessage("Datos actualizado con exito");
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (file) => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
    setIsImageChange(false);
    setIsErrorProfileUpdate(false);
    const url = `${process.env.API_URL}/users/profile`;
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("profile", file);

    try {
      const response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsTrue(true);
      setIsError(false);
      setMessage("Datos actualizado con exito");
      setData(response.data);
      setIsImageChange(true);
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setIsErrorProfileUpdate(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const updatePortada = async (file) => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
    const url = `${process.env.API_URL}/users/portada`;
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("portada", file);

    try {
      const response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsTrue(true);
      setIsError(false);
      setMessage("Datos actualizado con exito");
      setData(response.data);
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const updateBirthday = async (password, newBirthday) => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
    const url = `${process.env.API_URL}/users/birthday`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        url,
        {
          fecha_de_nacimiento: newBirthday,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsTrue(true);
      setIsError(false);
      setCurrentData(response.data);
      setMessage("Datos actualizado con exito");
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const follow = async (userId) => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
    const url = `${process.env.API_URL}/seguidors`;

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        url,
        {
          followed_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsTrue(true);
      setIsError(false);
      setCurrentData(response.data);
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const getFollowers = async (userId, page) => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
    const url = `${process.env.API_URL}/seguidores`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_id: userId,
          page,
        },
      });
      setIsTrue(true);
      setIsError(false);
      setCurrentData(response.data);
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const getFollowed = async (userId, page) => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
    const url = `${process.env.API_URL}/seguidos`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_id: userId,
          page,
        },
      });
      setIsTrue(true);
      setIsError(false);
      setCurrentData(response.data);
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const unfollow = async (userId) => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
    const url = `${process.env.API_URL}/seguidors/` + userId;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsTrue(true);
      setIsError(false);
      setCurrentData(response.data);
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFollower = async (userId) => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
    const url = `${process.env.API_URL}/seguidors/seguidor/` + userId;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsTrue(true);
      setIsError(false);
      setCurrentData(response.data);
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserInformation = async (data) => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
    const url = `${process.env.API_URL}/users/information`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        url,
        {
          fecha_de_nacimiento: data.fecha_nacimiento,
          direccion: data.direccion,
          descripcion: data.descripcion,
          nacionalidad: data.nacionalidad,
          nombre: data.nombre,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsTrue(true);
      setIsError(false);
      setData(response.data);
      setMessage("Datos actualizado con exito");
    } catch (error) {
      console.log(error);
      setIsTrue(false);
      setIsError(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProfile = async () => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
    setIsErrorProfile(false);
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
      setIsTrue(true);
      setIsError(false);
      setData(response.data);
      setMessage("Datos actualizado con exito");
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setIsErrorProfile(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const deletePortada = async () => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
    const url = `${process.env.API_URL}/users/delete_portada`;
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
      setIsTrue(true);
      setIsError(false);
      setData(response.data);
      setMessage("Datos actualizado con exito");
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (username,page) => {
    setLoading(true);
    setIsTrue(false);
    setIsError(false);
    const url = `${process.env.API_URL}/users/find_by_username/`+username;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page
          }
        }
      );
      setIsTrue(true);
      setIsError(false);
      setCurrentData(response.data);
    } catch (error) {
      setIsTrue(false);
      setIsError(true);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    setIsError(false);
    const url = `${process.env.API_URL}/users/${id}`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsError(false);
      return response?.data;
    } catch (error) {
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
    deleteProfile,
    isErrorProfile,
    isErrorProfileUpdate,
    getFollowFollowers,
    getUserLecturas,
    follow,
    unfollow,
    deleteFollower,
    getFollowers,
    getFollowed,
    updateUserInformation,
    updatePortada,
    deletePortada,
    deleteUser,
    searchUsers
  };
};

export default useUserInfo;
