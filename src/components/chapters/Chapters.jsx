"use client";
import useChapter from "@/hooks/useChapter";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { VscNewFile } from "react-icons/vsc";
import RenderCapitules from "./RenderChapters";

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
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
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
    <div className="max-w-72 rounded-md shadow-xl flex flex-col py-5">
      <div className="flex flex-row py-5 px-8">
        <VscNewFile className="h-10 active:bg-black" />
        <button onClick={handleAddNewChapter} className="p-2 text-sm">
          Agregar nuevo capitulo
        </button>
      </div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
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
