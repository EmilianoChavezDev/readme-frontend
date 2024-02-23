import Image from 'next/image'
import { LuEye } from 'react-icons/lu'
import { PiStarThin } from 'react-icons/pi'
import { PiWarningBold } from 'react-icons/pi'
import { GoListUnordered } from 'react-icons/go'

export default function Libro({ params }) {

    return (
        <div className='flex flex-col gap-3'>
            <section className='flex flex-grow shadow-lg'>
                <div className='w-1/2 flex justify-center items-center'>
                    <div className='flex gap-5 p-16'>
                        <Image src='https://m.media-amazon.com/images/I/81vh+EyUAOL._AC_UF1000,1000_QL80_.jpg' width={180} height={180} alt='Portada De Libro' />
                        <div className='flex-grow p-3 flex flex-col gap-3'>
                            <h1 className='font-bold text-xl'>Perfectos Mentirosos</h1>
                            <div className='flex'>
                                <div className='flex flex-col items-center flex-grow pr-2'>
                                    <div className='flex gap-1 items-center text-gray-400'>
                                        <LuEye />
                                        <span className='text-sm'>Lecturas</span>
                                    </div>
                                    <span className='font-semibold'>127M</span>
                                </div>
                                <div className='flex flex-col items-center flex-grow px-2 border-r border-l border-gray-400'>
                                    <div className='flex gap-1 items-center text-gray-400'>
                                        <PiStarThin strokeWidth={10}/>
                                        <span className='text-sm'>Votos</span>
                                    </div>
                                    <span className='font-semibold'>8.5M</span>
                                </div>
                                <div className='flex flex-col items-center flex-grow pl-2'>
                                    <div className='flex gap-1 items-center text-gray-400'>
                                        <GoListUnordered />
                                        <span className='text-sm'>Partes</span>
                                    </div>
                                    <span className='font-semibold'>65</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 text-white text-xs'>
                                <button className='h-10 rounded-md bg-[#167574]'>
                                    Comenzar a Leer
                                </button>
                                <button className='h-10 rounded-md bg-gray-500'>
                                    Añadir a Favoritos
                                </button>
                                <button className='h-10 rounded-md bg-gray-500'>
                                    Descargar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' relative w-1/2 flex justify-center items-center'>
                    <div className='flex flex-col gap-2 p-16'>
                        <h2 className='font-semibold'>Sinopsis:</h2>
                        <p className='text-[10px]'>
                            "Perfectos Mentirosos" es un thriller psicológico que desentraña los secretos de un exclusivo círculo social. Escrito por A. Veritas, este intrigante relato sumerge a los lectores en un mundo de lujo y oscuros pactos, donde un pasado turbio regresa para sacudir la apariencia de perfección. Con giros inesperados, la novela desafía la percepción de la verdad y lleva a los protagonistas a confrontar sus mentiras más profundas.
                        </p>
                    </div>
                    <button className='absolute bottom-5 right-10 bg-none outline-none border-none text-red-600 flex gap-1'>
                        <span>
                            <PiWarningBold />
                        </span>
                        <span className='text-xs whitespace-nowrap'>
                            Denunciar este libro
                        </span>
                    </button>
                </div>
            </section>
            <section className=''>
                <span>Hola Mundo</span>
            </section>
        </div>
    )

}