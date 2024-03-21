"use client";

import NavBar from "@/components/NavBar";

const page = ({ params }) => {
  console.log(params);
  return (
    <>
      <NavBar />
      <div className="flex flex-col _sm:w-4/6 w-full">
        <div>
          <h1 className="text-textHeaderColorGray">Informacion Personal</h1>
        </div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default page;
