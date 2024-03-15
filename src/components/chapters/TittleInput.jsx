<<<<<<< HEAD
import React, { useRef } from 'react';
=======
import React, { useRef } from "react";
>>>>>>> SCRUM-35-Componente-Crear-Organizar-Capitulos

const TittleInput = ({ ...props }) => {
  const inputRef = useRef(null);

  const handleInputClick = () => {
    inputRef.current.select();
  };

  return (
<<<<<<< HEAD
    <div className='flex justify-center w-full'>
=======
    <div className="flex justify-center w-full">
>>>>>>> SCRUM-35-Componente-Crear-Organizar-Capitulos
      <input
        ref={inputRef}
        type="text"
        className="text-2xl font-semibold border-none w-1/2 bg-transparent outline-none text-center hover:bg-gray-100 px-6 py-2 hover:cursor-pointer focus:cursor-text"
        onClick={handleInputClick}
        {...props}
      />
    </div>
  );
};

export default TittleInput;
