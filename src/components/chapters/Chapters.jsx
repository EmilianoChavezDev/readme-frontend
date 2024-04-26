"use client";
import useChapter from "@/hooks/useChapter";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import { VscNewFile } from "react-icons/vsc";
import RenderCapitules from "./RenderChapters";
import { useRouter } from "next/navigation";

export default function Chapters({ bookId }) {
  const [chapters, setChapters] = useState([]);

  const { getChapterByBook, swapChapter } = useChapter();

  const fetchChapters = async () => {
    const result = await getChapterByBook(bookId);
    setChapters(result);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Verificar si over es null
    if (!over) {
      return;
    }

    //Obtenemos el index de los capitulos
    const oldIndex = chapters.findIndex((cap) => cap.id === active.id);
    const newIndex = chapters.findIndex((cap) => cap.id === over.id);

    //Hacemos el swap de los capitulos
    swapChapter(chapters[oldIndex].id, chapters[newIndex].id);

    //Actualizamos el estado
    const newOrder = arrayMove(chapters, oldIndex, newIndex);
    setChapters(newOrder);
  };

  //Redirijimos a la pagina de creacion de capitulos
  const router = useRouter();

  const handleAddNewChapter = () => {
    //Al darle click a este boton, redirijimos a la pagina de creacion de capitulos
    router.push(`/books/${bookId}/chapters/write`);
  };

  //Obtenemos los capitulos de ese libro y los guardamos en el estado capitules
  useEffect(() => {
    fetchChapters();
  }, [bookId]);

  return (
    <div className="max-w-72 rounded-lg shadow-xl flex flex-col py-5 ">
      <div className="flex flex-row py-5 px-8">
        <VscNewFile className="h-10 active:bg-black dark:text-white " />
        <button
          onClick={handleAddNewChapter}
          className="p-2 text-sm dark:text-white"
        >
          Agregar nuevo capitulo
        </button>
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="max-h-36 overflow-y-scroll px-5 dark:text-white">
          <SortableContext
            items={chapters}
            strategy={verticalListSortingStrategy}
          >
            {chapters?.map((cap) => (
              <RenderCapitules bookId={bookId} key={cap.id} cap={cap} />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}
