"use client";
import useReadBooks from "@/hooks/useReadBook";
import { createContext, useContext, useState } from "react";

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
    postCurrentChapter,
    currentNextChapterData,
    changeBookEnd,
    bookInfo,
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
    await postCurrentChapter(idChapter, idBook, state);
    getNowChapter(idBook, data);

    setTimeout(() => {
      setIsChangeChapter(false);
    }, 3000);
  };

  const verifyCurrentChapter = async () => {
    await changeBookEnd(chapterData.libro_id);
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
        getChapter,
        verifyCurrentChapter,
        currentNextChapterData,
        bookInfo,
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
