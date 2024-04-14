"use client";
import { useEffect } from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import useChapter from "@/hooks/useChapter";
import useBook from "@/hooks/useBook";
import { saveAs } from "file-saver";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  chapterTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  chapterContent: {
    fontSize: 12,
    marginBottom: 20,
  },
});

const DownloadBook = ({ bookId }) => {
  const { getChapterByBook } = useChapter();
  const { getBookByID } = useBook();
  console.log("bookId", bookId);
  //   const fetchData = async () => {
  //     try {
  //       const [book, chapters] = await Promise.all([
  //         getBookByID(bookId),
  //         getChapterByBook(bookId),
  //       ]);
  //       console.log("book", book);
  //       console.log("chapters", chapters);
  //       generatePdf(book.titulo, chapters);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error al obtener datos:", error);
  //       setError("Error al obtener datos del libro.");
  //       setLoading(false);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchData();
  //   }, [bookId, getBookByID, getChapterByBook]);

  //   const generatePdf = (bookTitle, chaptersData) => {
  //     const doc = (
  //       <Document>
  //         {chaptersData.map((chapter, index) => (
  //           <Page key={index} style={styles.page}>
  //             <Text style={styles.chapterTitle}>{chapter.titulo}</Text>
  //             <Text style={styles.chapterContent}>{chapter.contenido}</Text>
  //           </Page>
  //         ))}
  //       </Document>
  //     );

  //     const pdfBlob = new Blob([doc], { type: "application/pdf" });
  //     saveAs(pdfBlob, `${bookTitle}.pdf`);
  //   };
  //   return null;
  // };
};

export default DownloadBook;
