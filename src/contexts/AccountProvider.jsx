"use client";

import { createContext, useContext, useState } from "react";

const AccountContext = createContext();

export const useAccountContext = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({
  children,
  showAddModeratorModal,
  setShowAddModeratorModal,
}) => {
  const values = {
    showAddModeratorModal,
    setShowAddModeratorModal,
  };

  return (
    <AccountContext.Provider value={values}>{children}</AccountContext.Provider>
  );
};
    