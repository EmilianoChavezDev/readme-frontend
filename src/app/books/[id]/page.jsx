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
import useDenuncias from "@/hooks/useDenuncias";
import useChapter from "@/hooks/useChapter";

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
    getContentChapter,
    contentChapter,
  } = useReadBooks();
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

  useEffect(() => {
    if (!isDownloading) return;
    generatePdf(book?.titulo, chapters);
  }, [isDownloading, capitulos]);

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
    setIsDownloading(false);
  };

  const handleDownloadBook = async () => {
    setIsDownloading(true);
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
            className="text-xs border rounded-lg p-3 flex-grow border-gray-400 outline-none"
            value={reasonForReporting}
            onChange={(event) => setReasonForReporting(event.target.value)}
            rows={2}
          />

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
        <div className="flex justify-center items-center">
          <h1>Libro no encontrado</h1>
        </div>
      ) : (
        <div className="flex flex-col gap-3 relative ">
          {isLoading && <Loader />}
          <section className="flex flex-grow flex-wrap shadow-lg">
            <div className="flex justify-center items-center min-w-96 w-full _lg:w-1/2">
              <div className="flex gap-5 p-10 flex-col _sm:flex-row _sm:p-3 _md:p-12 _xl:p-16 dark:bg-dark-darkColorItems dark:rounded-lg dark:mt-10">
                <div className="flex justify-center items-center bg-colorPrimario  dark:bg-purple-400">
                  <div className="flex justify-center items-center w-44 h-42 !min-h-42 text-white ">
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
                      <button className="h-9 rounded-md bg-colorPrimario w-full hover:bg-colorHoverPrimario  dark:bg-purple-600 dark:hover:bg-purple-400">
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
                          ? "h-9 rounded-md bg-colorPrimario text-white hover:bg-colorHoverPrimario dark:bg-purple-400 dark:hover:bg-purple-200 "
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
                      onClick={() => handleDownloadBook()}
                    >
                      Descargar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center items-center min-w-96 w-full _lg:w-1/2 dark:bg-dark-darkColorItems dark:mt-10 dark:rounded-lg ">
              <div className="flex flex-col gap-2 p-9 _lg:p-16">
                <h2 className="font-semibold">Sinopsis:</h2>
                <p className="text-sm">{book?.sinopsis}</p>
              </div>
              <button
                className="absolute bottom-5 right-10 bg-none outline-none border-none text-red-600 flex gap-1"
                onClick={handleReportBook}
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
