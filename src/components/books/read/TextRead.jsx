import useReadBooks from "@/hooks/useReadBook";
import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextRead = ({ urlContenido }) => {
  const { getContentChapter, contentChapter } = useReadBooks();
  const [text, setText] = useState("");
  const [zoom, setZoom] = useState(1); // Tamaño de fuente inicial
  const quillRef = useRef();

  useEffect(() => {
    getContentChapter(urlContenido);
  }, [urlContenido]);

  useEffect(() => {
    if (!contentChapter) return;
    setText(contentChapter);
  }, [contentChapter]);

  const handleZoom = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const handleUnZoom = () => {
    setZoom((prevZoom) => prevZoom - 0.1);
  };

  return (
    <div>
      <div>
        <button onClick={handleZoom}>Aumentar Tamaño</button>
        <button onClick={handleUnZoom}>Disminuir Tamaño</button>
      </div>
      <ReactQuill
        ref={quillRef}
        value={text}
        readOnly
        theme="snow"
        modules={{ toolbar: false }}
        style={{ zoom: zoom }}
      />
    </div>
  );
};

export default TextRead;
