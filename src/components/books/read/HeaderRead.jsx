"use client";
import { FaArrowLeft } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { IoText } from "react-icons/io5";
import { IoTextOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import CapMenu from "./CapMenu";
import { useRouter } from "next/navigation";
import { Tooltip } from "@material-tailwind/react";
import { UseRead } from "@/contexts/ReadProvider";
import { FaMicrophone } from "react-icons/fa";
import { BiSolidMicrophoneOff } from "react-icons/bi";

const HeaderRead = ({ titulo, capitulo, id, contentChapter }) => {
  const { handleUnZoom, handleZoom } = UseRead();
  const router = useRouter();
  const menuRef = useRef();
  const [showMenuCap, setShowMenuCap] = useState(false);
  const [previousContentChapter, setPreviousContentChapter] = useState("");

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [language, setLanguage] = useState("es-ES"); // Estado para manejar el idioma
  const speechSynthesisRef = useRef(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSpeechSupported(false);
      toast.error("Speech Synthesis no es soportado en este navegador.");
    } else {
      speechSynthesisRef.current = window.speechSynthesis;
      utteranceRef.current = new SpeechSynthesisUtterance();
    }
  }, []);

  useEffect(() => {
    if (contentChapter !== previousContentChapter && contentChapter) {
      startSpeech(contentChapter);
      setPreviousContentChapter(contentChapter);
    }
  }, [contentChapter]);

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const handleShowMenuCap = () => {
    setShowMenuCap(!showMenuCap);
  };

  const previousPage = () => {
    router.push(`/books/${id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenuCap(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      startSpeech(contentChapter);
    }
  };

  const stripHtml = (html) => {
    const temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  };

  const startSpeech = (text) => {
    if (!speechSupported) return;

    const plainText = stripHtml(text);

    if (!speechSynthesisRef.current || !plainText) return;
    if (isSpeaking) {
      stopSpeech();
      return;
    }

    utteranceRef.current.text = plainText;
    utteranceRef.current.lang = language;
    speechSynthesisRef.current.speak(utteranceRef.current);
    setIsSpeaking(true);

    utteranceRef.current.onend = () => {
      setIsSpeaking(false);
    };
  };

  const stopSpeech = () => {
    if (!speechSupported || !speechSynthesisRef.current) return;
    speechSynthesisRef.current.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="sm:w-2/3 mx-auto w-full">
      <div className="flex justify-between sticky top-0bg-white z-10 ">
        <div className="flex items-center justify-center ">
          <button onClick={() => previousPage()}>
            <div className="flex justify-center items-center gap-2">
              <div className="sm:w-8 sm:h-10 w-3 h-3 relative transition-all duration-200 transform hover:scale-110 group hover:cursor-pointer">
                <IoArrowBackOutline className="sm:w-full sm:h-full absolute top-0 left-0 group-hover:opacity-0" />
                <FaArrowLeft className="sm:w-full sm:h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
              </div>
              <div>
                <p className="sm:font-bold font-semibold">Volver</p>
              </div>
            </div>
          </button>
        </div>
        <Tooltip content={titulo}>
          <div className="flex text-center items-center w-2/3 truncate">
            <h1 className="mx-auto md:text-3xl text-colorPrimario text-center font-semibold text-lg truncate">
              {titulo}
            </h1>
          </div>
        </Tooltip>

        <div className="flex justify-center items-center">
          <div className="mb-2 px-2">
            <Tooltip content="Escuchar Capitulo">
              <button
                onClick={handleSpeech}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {isSpeaking ? <BiSolidMicrophoneOff /> : <FaMicrophone />}
              </button>
            </Tooltip>
          </div>
          <div className="relative">
            <Tooltip content="lista de capitulos" className="hidden _lg:block">
              <button onClick={() => handleShowMenuCap()}>
                <div className="group w-8 h-10 transition-all duration-200 transform hover:scale-110 relative mr-4 hover:cursor-pointer">
                  <CiBoxList className="w-full h-full absolute top-0 left-0 group-hover:opacity-0" />
                  <FaList className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
                </div>
              </button>
            </Tooltip>
            {showMenuCap && (
              <div ref={menuRef}>
                <CapMenu capitulo={capitulo} />
              </div>
            )}
          </div>
          <div>
            <Tooltip content="aumentar tamaño" className="hidden _lg:block">
              <button onClick={handleZoom}>
                <div className="w-8 h-10 transition-transform duration-200 transform hover:scale-110 relative hover:cursor-pointer">
                  <IoTextOutline className="w-full h-full absolute top-0 left-0" />
                  <IoText className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
                </div>
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="disminuir tamaño" className="hidden _lg:block">
              <button onClick={handleUnZoom}>
                <div className="w-8 h-5 transition-transform duration-200 transform hover:scale-110 relative mt-2 hover:cursor-pointer">
                  <IoTextOutline className="w-full h-full absolute top-0 left-0" />
                  <IoText className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
                </div>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderRead;
