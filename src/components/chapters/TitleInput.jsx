import React, { useRef } from "react";

const TittleInput = ({ ...props }) => {
  const inputRef = useRef(null);

  const handleInputClick = () => {
    inputRef.current.select();
  };

  return (
    <div className="flex justify-center w-full relative">
      <span className="absolute top-14 text-xs text-gray-400">
        {props.value.length}/70
      </span>
      <input
        ref={inputRef}
        placeholder="Ingrese el título del capítulo"
        type="text"
        className="text-2xl font-semibold border-none w-1/2 bg-transparent outline-none text-center hover:bg-gray-100 px-6 py-2 hover:cursor-pointer focus:cursor-text  dark:placeholder:dark:text-white"
        onClick={handleInputClick}
        maxLength={70}
        {...props}
      />
    </div>
  );
};

export default TittleInput;
