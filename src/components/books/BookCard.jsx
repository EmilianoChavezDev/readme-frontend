'use client'

import { TbBook } from 'react-icons/tb'
import { IoIosStar } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import { Tooltip } from '@material-tailwind/react'

export default function BookCard({ book }) {

    const SINOPSIS_MAX_LENGTH = 560

    const router = useRouter()

    return (
        <div className='min-w-56 max-w-56' onClick={() => router.push(`/books/${book.id}`)}>
            <div className='group relative flex flex-col gap-2 cursor-pointer'>
                <img src={book?.portada} className='object-cover aspect-portada' alt='Portada de Libro' />
                <p>{book.titulo}</p>
                <div className='absolute text-xs max-w-56 h-full transition-transform duration-300 text-white opacity-0 hover:opacity-100 hover:scale-105 bg-black bg-opacity-60 backdrop-blur-lg p-2 flex flex-col gap-1'>
                    <p className='font-bold'>{book.titulo}</p>
                    <div className='flex gap-1'>
                        <span className='font-semibold'>Autor:</span>
                        <span>{book.autorUsername}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <span>{book.puntuacion_media}</span>
                        <span><IoIosStar sise={12} /></span>
                        <span>{`(${book.cantidad_resenhas} reseñas)`}</span>
                    </div>
                    <p>{book.sinopsis.length > SINOPSIS_MAX_LENGTH ? `${book.sinopsis.substring(0, SINOPSIS_MAX_LENGTH)}...` : book.sinopsis}</p>
                    <div className='mt-auto mb-2 flex items-center justify-between'>
                        <span>{`${book.cantidad_capitulos_publicados} ${book.cantidad_capitulos_publicados === 1? 'capítulo' : 'capítulos'}`}</span>
                        {book.autorUsername !== localStorage.getItem('username') &&
                            <Tooltip content='Leer Libro'>
                                <button className='w-8 h-8 rounded-full hover:bg-gray-300 hover:text-gray-800 flex justify-center items-center'
                                    onClick={event => {
                                        router.push(`/books/${book.id}/read`)
                                        event.stopPropagation()
                                    }}>
                                    <TbBook size={22}/>
                                </button>
                            </Tooltip>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}