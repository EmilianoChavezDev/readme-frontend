import React, { useEffect, useState, useRef } from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import TextRead from "./TextRead";
import { UseRead } from "@/contexts/ReadProvider";
import { LuBookOpenCheck } from "react-icons/lu";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSwipeable } from "react-swipeable";
import { Tooltip } from "@material-tailwind/react";
import { isMobile } from "react-device-detect"; // Importar isMobile

const BodyRead = () => {
  const { chapterData, getCurrentChapterById, data } = UseRead();
  const router = useRouter();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [language, setLanguage] = useState("en-EN"); // Estado para manejar el idioma
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

  const shouldSendTrueNextChapter =
    chapterData?.next_capitulo_id === null ? true : false;
  const shouldSendTruePreviousChapter =
    chapterData?.previous_capitulo_id === null ? true : false;

  const handleSwipeLeft = () => {
    if (chapterData?.next_capitulo_id) {
      getCurrentChapterById(
        chapterData.libro_id,
        chapterData.next_capitulo_id,
        shouldSendTrueNextChapter
      );
    } else {
      getCurrentChapterById(
        chapterData.libro_id,
        data[0].id,
        shouldSendTrueNextChapter,
        true
      );
      console.log("entro aqui");
      router.push(`/books/${chapterData.libro_id}`);
      toast.success("¡Felicidades! Has terminado este libro");
    }
  };

  const handleSwipeRight = () => {
    if (chapterData?.previous_capitulo_id) {
      getCurrentChapterById(
        chapterData.libro_id,
        chapterData.previous_capitulo_id,
        shouldSendTruePreviousChapter
      );
    }
  };

  let swipeHandlers = {};
  if (isMobile) {
    swipeHandlers = useSwipeable({
      onSwipedLeft: handleSwipeLeft,
      onSwipedRight: handleSwipeRight,
      preventDefaultTouchmoveEvent: true,
      trackMouse: true,
    });
  }

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
    <div className="_sm:w-4/6 w-full mx-auto relative" {...swipeHandlers}>
      <div
        className="hidden _sm:block"
        style={{ position: "fixed", left: "10%", top: "50%" }}
      >
        {!chapterData?.previous_capitulo_id ? null : (
          <Tooltip content="capitulo anterior" className="hidden _lg:block">
            <button
              className="p-2 rounded-full hover:scale-110 transform transition-all duration-200"
              onClick={() =>
                getCurrentChapterById(
                  chapterData.libro_id,
                  chapterData?.previous_capitulo_id,
                  shouldSendTruePreviousChapter
                )
              }
            >
              <CiCircleChevLeft size={42} />
            </button>
          </Tooltip>
        )}
      </div>

      <div>
        <TextRead
          urlContenido={chapterData?.contenido}
          isSpeaking={isSpeaking}
          startSpeech={startSpeech}
          stopSpeech={stopSpeech}
        />
      </div>

      <div
        className="hidden _sm:block"
        style={{ position: "fixed", right: "10%", top: "50%" }}
      >
        {chapterData?.next_capitulo_id ? (
          <Tooltip content="siguiente capitulo" className={`hidden _lg:block`}>
            <button
              className="p-2 rounded-full hover:scale-110 transform transition-all duration-200"
              onClick={() =>
                getCurrentChapterById(
                  chapterData.libro_id,
                  chapterData?.next_capitulo_id,
                  shouldSendTrueNextChapter
                )
              }
            >
              <CiCircleChevRight size={42} />
            </button>
          </Tooltip>
        ) : (
          <Tooltip content="terminar libro">
            <button
              className="p-2 rounded-full hover:scale-110 transform transition-all duration-200"
              onClick={() => {
                getCurrentChapterById(
                  chapterData.libro_id,
                  data[0].id,
                  shouldSendTrueNextChapter
                );
                router.push(`/books/${chapterData.libro_id}`);
                toast.success("¡Felicidades! Has terminado este libro");
              }}
            >
              <LuBookOpenCheck size={40} />
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default BodyRead;
