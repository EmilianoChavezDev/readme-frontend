
"use client"
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const router = useRouter();

  const [token, setToken] = useState(null);
  const [expiration, setExpiration] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (data) => {
    setToken(data.token);
    setExpiration(data.expiration);
    setUsername(data.username);
    setRole(data.role);
    setUserId(data.userId);

    Object.keys(data).forEach((key) => localStorage.setItem(key, data[key]));
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");

    router.push("/auth/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    const storedExpiration = localStorage.getItem("expiration");
    if (storedExpiration) {
      setExpiration(storedExpiration);
    }

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }

    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        token,
        expiration,
        username,
        role,
        userId,
        logout,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser debe ser utilizado dentro de un UserContext');
    }
    return context;

};

export default UserProvider;
