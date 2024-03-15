"use client";
import useReadBooks from "@/hooks/useReadBook";
import React, { createContext, useContext, useState } from "react";

const ReadContext = createContext();

const ReadProvider = ({ children }) => {
  const [zoom, setZoom] = useState(1);

  const { getBookById, data, getNowChapter, chapterData, isLoading } =
    useReadBooks();

  const handleZoom = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const handleUnZoom = () => {
    setZoom((prevZoom) => prevZoom - 0.1);
  };

  const getAll = (id) => {
    getBookById(id);
    getNowChapter(id);
  };

  return (
    <ReadContext.Provider
      value={{
        zoom,
        handleUnZoom,
        handleZoom,
        data,
        chapterData,
        isLoading,
        getAll,
      }}
    >
      {children}
    </ReadContext.Provider>
  );
};

export function UseRead() {
  const context = useContext(ReadContext);
  if (!context) {
    throw new Error("read debe ser utilizado dentro de un readContext");
  }
  return context;
}

export default ReadProvider;
