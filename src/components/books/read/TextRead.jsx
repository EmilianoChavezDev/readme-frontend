"use client";
import useReadBooks from "@/hooks/useReadBook";
import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./custom-quill.css";
import { UseRead } from "@/contexts/ReadProvider";

const TextRead = ({ urlContenido }) => {
  const { zoom } = UseRead();
  const { getContentChapter, contentChapter, isChangeChapter } = useReadBooks();

  const [text, setText] = useState("");
  const quillRef = useRef();

  useEffect(() => {
    getContentChapter(urlContenido);
  }, [urlContenido]);

  useEffect(() => {
    if (!contentChapter) return;
    setText(contentChapter);
  }, [contentChapter]);

  return (
    <div className="select-none">
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
