import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextRead = ({ contenido }) => {
  const [text, setText] = useState("");
  const [baseFontSize, setBaseFontSize] = useState(16); // Tamaño de letra base

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(contenido);
        const data = await response.text();
        setText(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    if (contenido) {
      fetchData();
    }
  }, [contenido]);

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
