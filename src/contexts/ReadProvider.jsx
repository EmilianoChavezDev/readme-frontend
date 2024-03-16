"use client";
import useReadBooks from "@/hooks/useReadBook";
import React, { createContext, useContext, useEffect, useState } from "react";

const ReadContext = createContext();

const ReadProvider = ({ children }) => {
  const [zoom, setZoom] = useState(1);
  const [isChangeChapter, setIsChangeChapter] = useState(false);

  const {
    getBookById,
    data,
    getNowChapter,
    chapterData,
    isLoading,
    getCurrentChapter,
    currentChapterData, // este es nuevo dato cuando elijo otro capitulo
    postCurrentChapter,
  } = useReadBooks();

  const handleZoom = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const handleUnZoom = () => {
    setZoom((prevZoom) => prevZoom - 0.1);
  };

  // consulto todo lo que se necesita antes de cargar la pantalla
  const getAll = (id) => {
    getBookById(id);
  };

  const getChapter = (id, data) => {
    getNowChapter(id, data);
  };

  const getCurrentChapterById = async (idBook, idChapter, state) => {
    setIsChangeChapter(true);
    // getCurrentChapter(id);
    await postCurrentChapter(idChapter, idBook, state);
    getNowChapter(idBook, data);

    setTimeout(() => {
      setIsChangeChapter(false);
    }, 3000);
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
        getCurrentChapterById,
        isChangeChapter,
        currentChapterData,
        getChapter,
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
