import NavBar from "@/components/NavBar";
import BodyRead from "@/components/books/read/BodyRead";
import HeaderRead from "@/components/books/read/HeaderRead";
import ProgressBar from "@/components/books/read/ProgressBar";

export default function ReadBook({ params }) {
  return (
    <>
      <div className="hidden">
        <NavBar />
      </div>
      {/**HEADER */}
      <div className="sticky top-0 bg-white z-10 p-2">
        <HeaderRead />
      </div>
      {/**cuerpo */}
      <div className="flex justify-center mt-10 my-24">
        <BodyRead />
      </div>
      {/**footer */}
      <div className="fixed bottom-0 bg-white z-10 p-4 w-full">
        <ProgressBar percentage={"30"} />
      </div>
    </>
  );
}
