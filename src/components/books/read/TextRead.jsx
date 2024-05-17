"use client";
import useReadBooks from "@/hooks/useReadBook";
import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./custom-quill.css";
import { UseRead } from "@/contexts/ReadProvider";
import { FaMicrophone } from "react-icons/fa";
import { BiSolidMicrophoneOff } from "react-icons/bi";

const TextRead = ({ urlContenido, isSpeaking, startSpeech, stopSpeech }) => {
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

  const handleSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      startSpeech(text);
    }
  };

  return (
    <div className="select-none">
      <button
        onClick={handleSpeech}
        className="px-4 py-2 mt-5 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {isSpeaking ? <BiSolidMicrophoneOff /> : <FaMicrophone />}
      </button>
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
