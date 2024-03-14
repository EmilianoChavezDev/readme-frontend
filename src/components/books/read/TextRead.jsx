import useReadBooks from "@/hooks/useReadBook";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextRead = ({ urlContenido }) => {
  const { getContentChapter, contentChapter } = useReadBooks();
  const [text, setText] = useState("");
  const [baseFontSize, setBaseFontSize] = useState(16); // Tamaño de letra base

  useEffect(() => {
    getContentChapter(urlContenido);
  }, [urlContenido]);

  useEffect(() => {
    setText(contentChapter);
  }, [contentChapter]);

  const increaseFontSize = () => {
    setBaseFontSize((prevFontSize) => prevFontSize + 1);
  };

  const decreaseFontSize = () => {
    setBaseFontSize((prevFontSize) => Math.max(prevFontSize - 1, 1));
  };

  const adjustFontSize = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const elements = doc.querySelectorAll("*");

    elements.forEach((element) => {
      const computedStyle = window.getComputedStyle(element);
      const currentFontSize = parseFloat(computedStyle.fontSize);
      const newFontSize = currentFontSize * (baseFontSize / 16); // Ajustar proporcionalmente
      element.style.fontSize = `${newFontSize}px`;
    });

    return doc.documentElement.outerHTML;
  };

  const adjustedText = adjustFontSize(text);

  return (
    <div>
      <ReactQuill
        value={adjustedText}
        readOnly
        modules={{ toolbar: false }}
        theme={null}
      />
    </div>
  );
};

export default TextRead;
