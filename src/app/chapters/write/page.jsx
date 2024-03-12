"use client";
import ChapterEditorHeader from "@/components/chapters/ChapterEditorHeader";
import Editor from "@/components/chapters/Editor";
import TittleInput from "@/components/chapters/TittleInput";
import { useState } from "react";


const defaultChapterName = "Ingrese el titulo del capítulo..."
export default function WriteLibro() {
  const [chapterTitle, setChapterTitle] = useState(defaultChapterName)
  const [chapterContent, setChapterContent] = useState('')
  const [headerTittle, setHeaderTittle] = useState(defaultChapterName)

  const handleChapterWrite = (value) => {
    setChapterContent(value)
  }

  const handleTitleBlur = (e) => {
    if(!e.target.value){
      setChapterTitle(defaultChapterName)
      setHeaderTittle(defaultChapterName)
      return
    }
    setHeaderTittle(chapterTitle)

  }

  return (
    <div className="flex flex-col bg-white">
      <ChapterEditorHeader bookId={5} chapterTitle={headerTittle} />

      <div className="flex flex-col justify-center lg:py-6">
        <div className="d-flex justify-center w-full">
          <TittleInput value={chapterTitle} onChange={(e) => setChapterTitle(e.target.value)} onBlur={handleTitleBlur} />
        </div>
        <Editor chapterContent={chapterContent} onChange={handleChapterWrite} />
      </div>

    </div>
  );
}
