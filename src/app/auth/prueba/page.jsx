import NavBar from "@/components/NavBar";
import BodyRead from "@/components/books/read/BodyRead";
import HeaderRead from "@/components/books/read/HeaderRead";
import ProgressBar from "@/components/books/read/ProgressBar";
import React from "react";

const page = () => {
  return (
    <>
      <div>
        {/**HEADER */}
        <div className="sticky top-0 bg-white z-10 p-2">
          <HeaderRead />
        </div>
        {/**cuerpo */}
        <div>
          <BodyRead />
        </div>
        {/**footer */}
        <div className="sticky bottom-0 bg-white z-10 p-4 ">
          <ProgressBar percentage={"60"} />
        </div>
      </div>
    </>
  );
};

export default page;
