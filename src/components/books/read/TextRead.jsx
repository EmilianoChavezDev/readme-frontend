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
    const readFile = (contenido) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e);
        setText(e.target.result);
      };
      reader?.readAsText(contenido);
    };

    if (contentChapter) {
      console.log(contentChapter);
      readFile(contentChapter);
    }
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
        modules={{ toolbar: false }}
        theme={null}
        style={{
          zoom: zoom,
        }} // Aplica el tamaño de fuente dinámicamente al editor
      />
    </div>
  );
};

export default TextRead;

/**
 * 
 * import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Reader = ({ file }) => {
    const [text, setText] = useState('');
    const [zoom, setZoom] = useState(1); // Tamaño de fuente inicial
    const quillRef = useRef();

    useEffect(() => {
        if(!file) return
        const readFile = (file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setText(e.target.result);
            };
            reader.readAsText(file);
        };

        if (file) {
            readFile(file);
        }
    }, [file]);

    const handleZoom = ( ) => {
        setZoom(prevZoom => prevZoom+0.1)
    }

    const handleUnZoom = () => {
        setZoom(prevZoom => prevZoom-0.1)
    }

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
                modules={{ toolbar: false}}
                theme={null}
                
                style={{
                    zoom: zoom  
                }} // Aplica el tamaño de fuente dinámicamente al editor
            />
        </div>
    );
};

export default Reader;

 */
