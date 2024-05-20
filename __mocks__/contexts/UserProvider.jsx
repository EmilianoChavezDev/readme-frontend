import React, { createContext, useContext, useState } from "react";

// Creamos un contexto para el usuario
const UserContext = createContext();

// Creamos el proveedor de usuario
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [expiration, setExpiration] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  // Otros estados...

  // Función de inicio de sesión simulada
  const login = (data) => {
    setToken(data?.token);
    setExpiration(data?.expiration);
    setUsername(data?.username);
    setRole(data?.role);
    // Otras configuraciones necesarias...
  };

  // Función de cierre de sesión simulada
  const logout = () => {
    setToken(null);
    setExpiration(null);
    setUsername(null);
    setRole(null);
    // Otros restablecimientos necesarios...
  };

  // Retornamos el contexto del usuario con los valores y funciones necesarios
  return (
    <UserContext.Provider
      value={{
        token,
        expiration,
        username,
        role,
        login,
        logout,
        // Otros valores y funciones...
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto de usuario
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser utilizado dentro de un UserContext");
  }
  return context;
};
