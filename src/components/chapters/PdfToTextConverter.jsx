import { useState } from "react";
import pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfToTextConverter = ({ onTextExtracted }) => {
  const [pdfText, setPdfText] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const binaryString = event.target.result;
      const pdfData = new Uint8Array(binaryString);
      const pdf = await pdfjs.getDocument({ data: pdfData }).promise;

      let textContent = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const text = await page.getTextContent();
        textContent += text.items.map((item) => item.str).join(" ");
      }

      setPdfText(textContent);
      onTextExtracted(textContent);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <div>
        <h3>Texto extraído del PDF:</h3>
        <p>{pdfText}</p>
      </div>
    </div>
  );
};

export default PdfToTextConverter;
