import Link from "next/link";
import { FaAngleLeft, FaChevronDown } from "react-icons/fa6";
import { useState } from "react";
import Chapters from "./Chapters";

const ChapterEditorHeader = ({
  bookId,
  onSubmitPDF,
  onSave,
  onPublish,
  chapterTitle,
  disableButtons,
}) => {
  const [showChapters, setShowChapters] = useState(false);

  return (
    <div className="bg-ChaptearHeader h-20 flex flex-row justify-between items-center px-4 drop-shadow-lg sticky top-0 z-50 dark:bg-dark-darkColorNavBar">
      <div className="text-white font-semibold text-lg flex items-center relative">
        <Link href={`/books/${bookId}`}>
          <FaAngleLeft className="text-2xl" />
        </Link>
        <h3 className="px-4 truncate max-w-96">{chapterTitle}</h3>
        <div className="relative">
          <FaChevronDown
            className="text-2xl hover:cursor-pointer"
            onClick={() => setShowChapters(!showChapters)}
          />
          {showChapters && (
            <div className="absolute left-0 mt-1 w-full z-50 text-black min-w-72 bg-white dark:bg-dark-darkColorItems">
              <Chapters bookId={bookId} />
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="inline-block">
          <input
            type="file"
            onChange={onSubmitPDF}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="bg-gray-600 text-white py-2 px-4 md:px-7 rounded-lg disabled:cursor-not-allowed inline-block cursor-pointe dark:bg-dark-darkColorButtons dark:hover:bg-dark-darkColorHover cursor-pointer"
          >
            Subir PDF
          </label>
        </div>

        <button
          disabled={disableButtons}
          onClick={onSave}
          className={`bg-gray-600 text-white py-2 px-7 rounded-lg disabled:cursor-not-allowed dark:bg-dark-darkColorButtons dark:hover:bg-dark-darkColorHover`}
        >
          Guardar
        </button>
        <button
          disabled={disableButtons}
          onClick={onPublish}
          className={`bg-cyan-800 text-white py-2 px-7 rounded-lg disabled:cursor-not-allowed dark:bg-dark-darkColorButtons dark:hover:bg-dark-darkColorHover`}
        >
          Publicar
        </button>
      </div>
    </div>
  );
};

export default ChapterEditorHeader;
