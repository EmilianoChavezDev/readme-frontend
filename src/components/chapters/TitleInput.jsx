import React, { useRef } from "react";

const TittleInput = ({ ...props }) => {
  const inputRef = useRef(null);

  const handleInputClick = () => {
    inputRef.current.select();
  };

  return (
    <div className="flex justify-center w-full">
      <input
        ref={inputRef}
        placeholder='Ingrese el título del capítulo'
        type="text"
        className="text-2xl font-semibold border-none w-1/2 bg-transparent outline-none text-center hover:bg-gray-100 px-6 py-2 hover:cursor-pointer focus:cursor-text"
        onClick={handleInputClick}
        {...props} />
    </div>
  );
};

export default TittleInput;
