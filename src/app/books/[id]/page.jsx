"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { LuEye } from "react-icons/lu";
import { useEffect, useState } from "react";
import { PiStarThin } from "react-icons/pi";
import { FaRegImage } from "react-icons/fa6";
import { PiWarningBold } from "react-icons/pi";
import { GoListUnordered } from "react-icons/go";

import useBook from "@/hooks/useBook";
import NavBar from "@/components/NavBar";
import { addNumberFormat } from "@/utils";
import useReview from "@/hooks/useReview";
import Modal from "@/components/common/modal";
import useFavorite from "@/hooks/useFavorite";
import useReadBooks from "@/hooks/useReadBook";
import Loader from "@/components/common/loader";
import ReviewSelector from "@/components/books/ReviewSelector";
import CommentsSection from "@/components/books/CommentsSection";
import { Document, Page, Text, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { convert } from "html-to-text";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  chapterTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  chapterContent: {
    fontSize: 10,
    padding: 0,
    marginBottom: 0,
  },
});

export default function BookDetails({ params }) {
  const { getReadBook } = useReadBooks();
  const { getBookByID, isLoading, error } = useBook();
  const {
    downloadBook,
    data: capitulos,
    isDownloading,
    getContentChapter,
    contentChapter,
  } = useReadBooks();
  const { createOrUpdateReview, getReviewByUserAndBook, deleteReview } =
    useReview();
  const { getFavoriteByUserAndBook, createFavorite, updateFavorite } =
    useFavorite();

  const [book, setBook] = useState(null);
  const [review, setReview] = useState(null);
  const [favorite, setFavorite] = useState(null);
  const [readBook, setReadBook] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reasonForReporting, setReasonForReporting] = useState("");

  const fetchBook = async () => {
    const result = await getBookByID(params.id);
    setBook(result);
  };

  const fetchReview = async () => {
    const result = await getReviewByUserAndBook({
      libro_id: book.id,
      user_id: localStorage.getItem("user_id"),
    });
    setReview(result);
  };

  const updateReview = async (puntuacion) => {
    let result = null;
    if (puntuacion) {
      result = await createOrUpdateReview({ libro_id: book.id, puntuacion });
    } else {
      result = await deleteReview(review.id);
    }
    fetchBook();
    setReview(result?.resenha);
  };

  const getFavorite = async () => {
    const result = await getFavoriteByUserAndBook({
      libro_id: book.id,
      user_id: localStorage.getItem("user_id"),
    });
    setFavorite(result);
  };

  const getCurrentReadBook = async () => {
    const result = await getReadBook({
      libro_id: book.id,
      user_id: localStorage.getItem("user_id"),
    });
    setReadBook(result);
  };

  const toggleFavorite = async () => {
    let result = favorite
      ? await updateFavorite(favorite.id, {
          libro_id: book.id,
          fav: !favorite.favorito,
        })
      : await createFavorite({ libro_id: book.id, fav: true });
    setFavorite(result?.favorito);
    toast.success(
      result?.favorito?.favorito
        ? "El libro ha sido añadido a tus favoritos"
        : "El libro ha sido quitado de tus favoritos"
    );
  };

  const reportBoot = async () => {
    toast.error("Falta implementar en la API");
    setShowReportModal(false);
  };

  useEffect(() => {
    fetchBook();
  }, [params.id]);

  useEffect(() => {
    if (book?.id) {
      fetchReview();
      getFavorite();
      getCurrentReadBook();
    }
  }, [book?.id]);

  useEffect(() => {
    if (!isDownloading) return;
    generatePdf(book?.titulo, capitulos);
  }, [isDownloading]);

  const generatePdf = async (bookTitle, chaptersData) => {
    const downloadedChapters = [];

    const downloadChapterContent = async (contenidoUrl) => {
      await getContentChapter(contenidoUrl);
      downloadedChapters.push(contentChapter);
    };
    await Promise.all(
      chaptersData.map((chapter) => downloadChapterContent(chapter.contenido))
    );
    const cleanedChapters = downloadedChapters?.map(convert);

    const doc = (
      <Document>
        {chaptersData?.map((chapter, index) => (
          <Page key={index} style={styles.page}>
            <Text style={styles.chapterTitle}>{chapter.titulo}</Text>
            <Text style={styles.chapterContent}>{cleanedChapters[index]}</Text>
          </Page>
        ))}
      </Document>
    );

    const pdfBlob = await pdf(doc).toBlob();
    saveAs(pdfBlob, `${bookTitle}.pdf`);
  };
  return (
    <>
      <Modal
        open={Boolean(showReportModal)}
        onHide={() => setShowReportModal(false)}
        onSave={reportBoot}
        title="Denunciar Libro"
      >
        <div className="flex flex-col gap-2">
          <span>Indícanos el motivo de tu reporte</span>
          <textarea
            className="text-xs border rounded-lg p-3 flex-grow border-gray-400 outline-none"
            value={reasonForReporting}
            onChange={(event) => setReasonForReporting(event.target.value)}
            rows={2}
          />
        </div>
      </Modal>
      {error ? (
        <div className="flex justify-center items-center">
          <h1>Libro no encontrado</h1>
        </div>
      ) : (
        <div className="flex flex-col gap-3 relative">
          {isLoading && <Loader />}
          <section className="flex flex-grow flex-wrap shadow-lg">
            <div className="flex justify-center items-center min-w-96 w-full _lg:w-1/2">
              <div className="flex gap-5 p-10 flex-col _sm:flex-row _sm:p-3 _md:p-12 _xl:p-16">
                <div className="flex justify-center items-center bg-colorPrimario">
                  <div className="flex justify-center items-center w-44 h-42 !min-h-42 text-white">
                    {book?.portada ? (
                      <Image
                        src={book.portada}
                        width={180}
                        height={180}
                        alt="Portada De Libro"
                        priority={true}
                      />
                    ) : (
                      <FaRegImage size={35} />
                    )}
                  </div>
                </div>
                <div className="flex-grow p-3 flex flex-col gap-3">

                  <div className="flex flex-col gap-1">
                    <h1 className="font-extrabold text-xl">{book?.titulo}</h1>
                    <div className="flex items-center text-sm gap-2">
                      <span className="font-semibold">Categoria:</span>
                      <span className="font-light">{book?.categoria}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Autor:</span>
                      <span className="font-light transition-all duration-100 hover:scale-105 hover:font-semibold">
                        <Link href={`/user/${book?.autorUsername}`}>
                          <span>{book?.autorUsername}</span>
                        </Link>
                      </span>
                    </div>

                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center flex-grow pr-2">
                      <div className="flex gap-1 items-center text-gray-400">
                        <LuEye />
                        <span className="text-sm">Lecturas</span>
                      </div>
                      <span className="font-semibold">
                        {addNumberFormat(book?.cantidad_lecturas)}
                      </span>
                    </div>
                    <div className="flex flex-col items-center flex-grow px-2 border-r border-l border-gray-400">
                      <div className="flex gap-1 items-center text-gray-400">
                        <PiStarThin strokeWidth={10} />
                        <span className="text-sm">Puntuación</span>
                      </div>
                      <span className="font-semibold">
                        {addNumberFormat(
                          Number(book?.puntuacion_media.toFixed(1))
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col items-center flex-grow pl-2">
                      <div className="flex gap-1 items-center text-gray-400">
                        <GoListUnordered />
                        <span className="text-sm">Partes</span>
                      </div>
                      <span className="font-semibold">
                        {book?.cantidad_capitulos_publicados ?? 0}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 text-white text-xs">
                    <Link href={`/books/${params.id}/read`}>
                      <button className="h-9 rounded-md bg-colorPrimario w-full hover:bg-colorHoverPrimario">
                        {readBook?.terminado
                          ? "Volver a leer"
                          : readBook
                          ? "Continuar Leyendo"
                          : "Comenzar a Leer"}
                      </button>
                    </Link>
                    <button
                      className={
                        favorite?.favorito
                          ? "h-9 rounded-md bg-colorPrimario text-white hover:bg-colorHoverPrimario"
                          : "h-9 rounded-md bg-gray-500 hover:brightness-90"
                      }
                      onClick={toggleFavorite}
                    >
                      {favorite?.favorito
                        ? "Quitar de Favoritos"
                        : "Añadir a Favoritos"}
                    </button>
                    <button
                      className="h-9 rounded-md bg-gray-500 hover:brightness-90"
                      onClick={() => downloadBook(book?.id)}
                    >
                      Descargar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center items-center min-w-96 w-full _lg:w-1/2">
              <div className="flex flex-col gap-2 p-9 _lg:p-16">
                <h2 className="font-semibold">Sinopsis:</h2>
                <p className="text-sm">{book?.sinopsis}</p>
              </div>
              <button
                className="absolute bottom-5 right-10 bg-none outline-none border-none text-red-600 flex gap-1"
                onClick={() => setShowReportModal(true)}
              >
                <span>
                  <PiWarningBold />
                </span>
                <span className="text-xs whitespace-nowrap">
                  Denunciar este libro
                </span>
              </button>
              <div className="absolute top-10 right-10">
                <ReviewSelector
                  currentPoint={review?.puntuacion ?? 0}
                  onSelect={updateReview}
                />
              </div>
            </div>
          </section>
          <CommentsSection bookId={book?.id} />
        </div>
      )}
    </>
  );
}
