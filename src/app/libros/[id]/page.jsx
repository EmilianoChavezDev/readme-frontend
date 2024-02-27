'use client'

import Image from 'next/image'
import { LuEye } from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { PiStarThin } from 'react-icons/pi'
import { FaRegImage } from 'react-icons/fa6'
import { PiWarningBold } from 'react-icons/pi'
import { GoListUnordered } from 'react-icons/go'
import { VscKebabVertical } from 'react-icons/vsc'

import ServiciosDeLibro from '@/services/libro'

export default function Libro({ params }) {

    const [libro, setLibro] = useState(null)

    const fetchLibro = async () => {
        const result = await ServiciosDeLibro.obtenerPorId(params.id)
        setLibro(result)
    }

    useEffect(() => {
        fetchLibro()
    }, [params.id])

    return (
        <div className='flex flex-col gap-3'>
            <section className='flex flex-grow shadow-lg'>
                <div className='w-1/2 flex justify-center items-center'>
                    <div className='flex gap-5 p-16'>
                        <div className='flex justify-center items-center w-44 h-42 bg-colorPrimario text-white'>
                            {libro?.portada?
                                <Image src={libro.portada} width={180} height={180} alt='Portada De Libro' priority={true}/> 
                                    : <FaRegImage size={35}/>
                            }
                        </div>
                        <div className='flex-grow p-3 flex flex-col gap-3'>
                            <h1 className='font-extrabold text-xl'>{libro?.titulo}</h1>
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
                                <button className='h-9 rounded-md bg-colorPrimario'>
                                    Comenzar a Leer
                                </button>
                                <button className='h-9 rounded-md bg-gray-500'>
                                    Añadir a Favoritos
                                </button>
                                <button className='h-9 rounded-md bg-gray-500'>
                                    Descargar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative w-1/2 flex justify-center items-center'>
                    <div className='flex flex-col gap-2 p-16'>
                        <h2 className='font-semibold'>Sinopsis:</h2>
                        <p className='text-[10px]'>
                            {libro?.sinopsis}
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
                    <div className='absolute top-10 right-10 flex gap-2 text-gray-400'>
                        <PiStarThin strokeWidth={10}/>
                        <PiStarThin strokeWidth={10}/>
                        <PiStarThin strokeWidth={10}/>
                        <PiStarThin strokeWidth={10}/>
                        <PiStarThin strokeWidth={10}/>
                    </div>
                </div>
            </section>
            <section className='flex'>
                <div className='w-1/2 px-16 py-4 flex flex-col gap-3'>
                    <span className='font-extrabold text-xl'>Comentarios</span>
                    <div className='flex gap-2'>
                        <div className='w-8 h-8 rounded-full bg-purple-300 text-white flex justify-center items-center'>
                            E
                        </div>
                        <textarea className='text-xs border rounded-lg p-3 flex-grow border-gray-400 outline-none' placeholder='Añadir un comentario' rows={5}/>
                        <button className='bg-colorPrimario text-white h-9 px-3 rounded-lg'>
                            Añadir
                        </button>
                    </div>
                </div>
                <div className='w-1/2 px-16 py-4'>
                    <ul>
                        <li>
                            <div className='text-xs flex flex-col gap-3'>
                                <header className='flex justify-between'>
                                    <div className='flex gap-2 items-center h-10'>
                                        <Image className='rounded-full w-7 h-7' src='https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHx8MA%3D%3D' width={40} height={40} alt='user icon'/>
                                        <span className='text-black font-bold'>amyrobson</span>
                                        <span className='text-gray-400'>1 month ago</span>
                                    </div>
                                    <button className='h-9'>
                                        <VscKebabVertical size={15} />
                                    </button>
                                </header>
                                <p>Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    )

}