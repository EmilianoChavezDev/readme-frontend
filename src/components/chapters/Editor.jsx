import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false }); // added to prevent ReferenceError: document is not defined

import "@/styles/chapters/styles.css";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  [{ font: [] }],
  [{ color: [] }, { background: [] }],
  ["bold", "italic", "underline", "strike"],
  [{ align: [] }],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
];

const Editor = ({ chapterContent, onChange }) => {
  return (
    <div className={`editor-container mt-10 px-10 md:px-52`}>
      <QuillEditor
        value={chapterContent}
        onChange={onChange}
        placeholder="Escriba su capitulo aqui..."
        theme="snow"
        modules={{
          toolbar: toolbarOptions,
        }}
      />
    </div>
  );
};

export default Editor;
