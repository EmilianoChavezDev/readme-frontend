"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegImage } from "react-icons/fa6";
import { GoListUnordered } from "react-icons/go";
import { LuEye } from "react-icons/lu";
import { PiStarThin, PiWarningBold } from "react-icons/pi";

import CommentsSection from "@/components/books/CommentsSection";
import ReviewSelector from "@/components/books/ReviewSelector";
import Loader from "@/components/common/loader";

import NotFound from "@/components/common/NotFound";
import Modal from "@/components/common/modal";
import useBook from "@/hooks/useBook";
import useChapter from "@/hooks/useChapter";
import useDenuncias from "@/hooks/useDenuncias";
import useFavorite from "@/hooks/useFavorite";
import useReadBooks from "@/hooks/useReadBook";
import useReview from "@/hooks/useReview";
import { addNumberFormat } from "@/utils";
import { Tooltip } from "@material-tailwind/react";
import { Document, Page, StyleSheet, Text, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { convert } from "html-to-text";
import { TbRating18Plus } from "react-icons/tb";
import { FaBellSlash } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

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
  const { getBookByID, isLoading, error, activateNotification } = useBook();
  const { createOrUpdateReview, getReviewByUserAndBook, deleteReview } =
    useReview();
  const { getFavoriteByUserAndBook, createFavorite, updateFavorite } =
    useFavorite();
  const { getChapterByBook } = useChapter();

  const [book, setBook] = useState(null);
  const [review, setReview] = useState(null);
  const [favorite, setFavorite] = useState(null);
  const [readBook, setReadBook] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reasonForReporting, setReasonForReporting] = useState("");
  const { getReportBookCategory, createReportBook } = useDenuncias();
  const [categoryBookReport, setCategoryBookReport] = useState([]);
  const [categorySelectBookReport, setCategorySelectBookReport] = useState("");
  const [errorMotive, setErrorMotive] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [chapters, setChapters] = useState([]);

  const fetchBookCategoryReport = async () => {
    try {
      const categoriesData = await getReportBookCategory();
      setCategoryBookReport(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fnCreateReportBook = async () => {
    try {
      await createReportBook({
        libro_id: book.id,
        reporte: {
          motivo: reasonForReporting,
          estado: "pendiente",
          categoria: categorySelectBookReport,
        },
      });
    } catch (error) {
      console.error("Error report create:", error);
    }
  };

  const handleReportBook = () => {
    fetchBookCategoryReport();
    setShowReportModal(true);
  };

  const fetchBook = async () => {
    const result = await getBookByID(params.id);
    const chapters = await getChapterByBook(params.id);
    setBook(result);
    setChapters(chapters);
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

  const reportBook = async () => {
    if (!reasonForReporting || !categorySelectBookReport) {
      setErrorMotive(true);
      return;
    }
    toast.success("Libro Reportado");
    fnCreateReportBook();
    setCategorySelectBookReport("");
    setReasonForReporting("");

    setShowReportModal(false);
    setErrorMotive(false);
  };

  const handleCancelReportBook = () => {
    setShowReportModal(false);
    setCategorySelectBookReport("");
    setReasonForReporting("");
    setShowReportModal(false);
    setErrorMotive(false);
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

  const [notificationEnabled, setNotificationEnabled] = useState(
    book?.notificaciones
  );

  useEffect(() => {
    if (book) {
      setNotificationEnabled(book.notificacion);
    }
  }, [book]);

  const toggleNotification = async () => {
    try {
      await activateNotification(book.id, !notificationEnabled);
      setNotificationEnabled((prev) => !prev);
      toast.success(
        `Notificación ${
          notificationEnabled ? "desactivada" : "activada"
        } correctamente`
      );
    } catch (error) {
      console.error("Error toggling notification:", error);
      toast.error("Hubo un error al cambiar la notificación");
    }
  };

  const handleDownloadBook = async () => {
    setIsDownloading(true);
    await generatePdf(book?.titulo, chapters);
    setIsDownloading(false);
  };

  const downloadChapterContent = async (contenidoUrl) => {
    try {
      const response = await fetch(contenidoUrl);
      const htmlText = await response.text();
      return htmlText;
    } catch (error) {
      toast.error("No se pudo obtener el contenido del capítulo");
    }
  };

  const generatePdf = async (bookTitle, chaptersData) => {
    const downloadedChapters = [];
    await Promise.all(
      chaptersData.map(async (chapter) => {
        const data = await downloadChapterContent(chapter.contenido);
        downloadedChapters.push(data);
      })
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
        onHide={handleCancelReportBook}
        onSave={reportBook}
        title="Denunciar Libro"
      >
        <div className="flex flex-col gap-2">
          <span>Indícanos el motivo de tu reporte</span>
          <textarea
            className="text-xs border rounded-lg p-3 pr-16 flex-grow border-gray-400 outline-none"
            value={reasonForReporting}
            onChange={(event) => {
              const inputValue = event.target.value.slice(0, 500);
              setReasonForReporting(inputValue);
            }}
            maxLength={500}
            rows={5}
          />
          <span className="absolute top-16 right-6 text-xs text-gray-400">
            {reasonForReporting.length}/500
          </span>

          <select
            className="text-xs border rounded-lg p-2 py-2 border-gray-400 outline-none"
            value={categorySelectBookReport}
            onChange={(e) => setCategorySelectBookReport(e.target.value)}
          >
            <option value="">Selecciona el motivo del reporte</option>
            {categoryBookReport?.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {errorMotive && (
            <div className="text-red-500">
              Por favor, describe y selecciona un motivo.
            </div>
          )}
        </div>
      </Modal>
      {error ? (
        <div className="flex justify-center pt-10">
          <NotFound
            message={
              "Lo siento, el libro que estás buscando no se encuentra en nuestra biblioteca en este momento. Por favor, verifica la URL o intenta buscar otro libro. "
            }
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3 relative ">
          {isLoading && <Loader />}
          <section className="flex flex-grow flex-wrap shadow-lg">
            <div className="flex justify-center items-center min-w-96 w-full _lg:w-1/2">
              <div className="flex gap-5 p-10 flex-col _sm:flex-row _sm:p-3 _md:p-12 _xl:p-16 w-4/6 mx-auto">
                <div className="flex justify-center items-center ">
                  <div className="flex justify-center items-center w-44 aspect-portada text-white relative bg-colorPrimario dark:bg-dark-darkColorButtons text-white relative">
                    {book?.adulto && book?.portada ? (
                      <div className="absolute top-0 left-0 p-2">
                        <TbRating18Plus className="text-5xl bg-white rounded-full text-red-500 dark:bg-red-500" />
                      </div>
                    ) : book?.adulto && !book?.portada ? (
                      <div className="absolute top-0 left-0 p-2">
                        <TbRating18Plus className="text-5xl bg-white rounded-full text-red-500 dark:bg-red-500" />
                      </div>
                    ) : null}
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
                <div className="flex-grow p-3 flex flex-col gap-3 w-4/6 mx-auto">
                  <div className="flex flex-col gap-1">
                    <Tooltip content={book?.titulo}>
                      <h1 className="font-bold text-lg truncate">
                        {book?.titulo}
                      </h1>
                    </Tooltip>

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
                        {book && book.puntuacion_media !== undefined
                          ? addNumberFormat(
                              Number(book.puntuacion_media.toFixed(1))
                            )
                          : ""}
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
                    {/* Botón para activar/desactivar notificaciones */}
                  </div>
                  <div className="flex flex-col gap-3 text-white text-xs">
                    <Link href={`/books/${params.id}/read`}>
                      <button className="h-9 rounded-md bg-colorPrimario w-full hover:bg-colorHoverPrimario  ">
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
                          ? "h-9 rounded-md bg-colorPrimario text-white hover:bg-colorHoverPrimario dark:bg-dark-darkColorButtons "
                          : "h-9 rounded-md bg-gray-500 hover:brightness-90 dark:bg-dark-darkColorButtons "
                      }
                      onClick={toggleFavorite}
                    >
                      {favorite?.favorito
                        ? "Quitar de Favoritos"
                        : "Añadir a Favoritos"}
                    </button>
                    <button
                      className="h-9 rounded-md bg-gray-500 hover:brightness-90 dark:bg-dark-darkColorButtons"
                      onClick={handleDownloadBook}
                      disabled={isDownloading}
                    >
                      Descargar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center items-center min-w-96 w-full _lg:w-1/2">
              <div className="flex flex-col gap-2 p-9 _lg:p-16 w-4/6">
                <h2 className="font-semibold">Sinopsis:</h2>
                <Tooltip content={book?.sinopsis}>
                  <p className="text-sm line-clamp-4">{book?.sinopsis}</p>
                </Tooltip>
              </div>
              <button
                className="absolute bottom-5 right-10 bg-none outline-none border-none text-red-600 flex gap-1"
                onClick={handleReportBook}
              >
                <span>
                  <PiWarningBold />
                </span>

                <span className="text-xs whitespace-nowrap  ">
                  Denunciar este libro
                </span>
              </button>
              <div className="absolute top-10 right-10 flex flex-col items-center">
                <ReviewSelector
                  currentPoint={review?.puntuacion ?? 0}
                  onSelect={updateReview}
                />
                <Tooltip
                  content={
                    notificationEnabled
                      ? "Desactivar notificación"
                      : "Activar notificación"
                  }
                >
                  <button
                    className="mt-4 h-8 w-8 flex justify-center items-center bg-transparent border-none outline-none"
                    onClick={toggleNotification}
                  >
                    {notificationEnabled ? (
                      <FaBellSlash size={32} className="text-black-500" />
                    ) : (
                      <FaBell size={32} className="text-green-500" />
                    )}
                  </button>
                </Tooltip>
              </div>
            </div>
          </section>
          <CommentsSection bookId={book?.id} />
        </div>
      )}
    </>
  );
}
