"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useBook from "@/hooks/useBook";
import Loader from "@/components/common/loader";
import Editor from "@/components/chapters/Editor";
import { useUser } from "@/contexts/UserProvider";
import TitleInput from "@/components/chapters/TitleInput";
import ChapterEditorHeader from "@/components/chapters/ChapterEditorHeader";

export default function ChapterForm({
  bookId,
  chapter,
  onSave,
  onPublish,
  isLoading,
}) {
  const router = useRouter();
  const { userId } = useUser();
  const { getBookByID, isLoading: isBookLoading, error: bookError } = useBook();

  const [file, setFile] = useState(null);
  const [book, setBook] = useState(null);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");

  const fetchBook = async () => {
    const result = await getBookByID(bookId);
    setBook(result);
  };

  const handleChapterWrite = (value) => {
    setChapterContent(value);
  };

  const getFormData = () => {
    const formData = new FormData();
    formData.set("titulo", chapterTitle);
    formData.set("libro_id", bookId);
    const blob = new Blob([chapterContent], { type: "text/html" });
    formData.append("contenido", blob, `book_${bookId}.html`);
    return formData;
  };

  const handleSubmitPDF = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSave = () => {
    if (!chapterTitle?.trim()?.length)
      return toast.error("El título del capítulo es requerido");
    if (!chapterContent?.trim()?.length)
      return toast.error("Debe agregar algún contenido antes de poder guardar");
    onSave(getFormData());
  };

  const handlePublish = () => {
    if (!chapterTitle?.trim()?.length)
      return toast.error("El título del capítulo es requerido");
    if (!chapterContent?.trim()?.length)
      return toast.error(
        "Debe agregar algún contenido antes de poder publicar"
      );
    onPublish(getFormData());
  };

  const recoverContent = async () => {
    try {
      const response = await fetch(chapter?.contenido);
      if (!response.ok) {
        toast.error("No se pudo obtener el contenido del capítulo");
      }
      const htmlText = await response.text();
      setChapterContent(htmlText);
    } catch (error) {
      toast.error("No se pudo obtener el contenido del capítulo");
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  useEffect(() => {
    if (chapter) {
      setChapterTitle(chapter.titulo);
      recoverContent();
    }
  }, [chapter]);

  useEffect(() => {
    if (userId && book && Number(userId) !== book.user_id) {
      toast.error("Acceso Denegado");
      router.push(`/books/${bookId}`);
    }
  }, [[userId, book]]);

  return (
    <>
      {bookError ? (
        <div className="flex justify-center items-center h-">
          <h1>El capítulo de este libro no fue encontrado</h1>
        </div>
      ) : (
        <div className="flex flex-col bg-white">
          {isBookLoading && <Loader />}
          <ChapterEditorHeader
            bookId={bookId}
            chapterTitle={
              chapter ? "Editar capítulo" : "Añadir un nuevo capítulo"
            }
            onSubmitPDF={handleSubmitPDF}
            onSave={handleSave}
            onPublish={handlePublish}
            disableButtons={isLoading}
          />
          <div className="flex flex-col justify-center lg:py-6">
            <div className="d-flex justify-center w-full">
              <TitleInput
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
              />
            </div>
            <Editor
              chapterContent={chapterContent}
              onChange={handleChapterWrite}
            />
          </div>
        </div>
      )}
    </>
  );
}
