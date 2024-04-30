'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'

import useBook from '@/hooks/useBook'
import useGetLibros from '@/hooks/useGetLibros'
import BookCard from '@/components/books/BookCard'
import ScrollableBookList from '@/components/books/ScrollableBookList'

const ColoredDivsList = () => {

    const router = useRouter()

    const { getAllBooks } = useBook()
    const { getContinueReading, dataContinueReading } = useGetLibros()

    const [books, setBooks] = useState([])

    const fetchNews = async () => {
        const result = await getAllBooks({ page: 1 })
        setBooks(result?.data)
    }

    const existingCategories = useMemo(() => {
        return books?.length? books?.map(book => book.categoria)?.filter((valor, indice, self) => {
            return self.indexOf(valor) === indice
        }) : []
    }, [books])

    useEffect(() => {
        fetchNews()
        getContinueReading()
    }, [])

    return (
        <div className='flex flex-col gap-10 py-10'>
            <div className={`${books?.length? 'flex' : 'hidden'} flex-col`}>
                <h2 className='text-3xl leading-7 font-bold pl-9'>Novedades</h2>
                <ScrollableBookList>
                    {books?.map((book, index) => (
                        <BookCard key={index} book={book} />
                    ))}
                </ScrollableBookList>
            </div>
            <div className={`${dataContinueReading?.libros?.length? 'flex' : 'hidden'} flex-col`}>
                <h2 className='text-3xl leading-7 font-bold pl-9'>Seguir Leyendo</h2>
                <ScrollableBookList>
                    {dataContinueReading?.libros?.map((book, index) => (
                        <BookCard key={index} book={book} />
                    ))}
                </ScrollableBookList>
            </div>
            <div className={`${dataContinueReading?.libros?.length? 'flex' : 'hidden'} flex-col gap-3`}>
                <h2 className='text-3xl leading-7 font-bold pl-9'>Navega por nuestras categorías</h2>
                <div className='flex flex-col gap-3 pl-12'>
                    {existingCategories?.map((category, index) => 
                        <div key={index} className='flex flex-col gap-2'>
                            <h3 className='text-2xl font-semibold'>{category}</h3>
                            <div className='flex justify-center items-center py-3 px-60 cursor-pointer' onClick={() => router.push(`/books/${books?.filter(book => book.categoria === category)[0]?.id}`)}>
                                <div className='flex gap-5 p-3 border border-gray-300 rounded-md'>
                                    <img src={books?.filter(book => book.categoria === category)[0]?.portada} className='object-cover min-w-56 max-w-56 aspect-portada' alt='Portada de Libro' />
                                    <div className='flex flex-col justify-center gap-3'>
                                        <h3 className='text-xl font-bold'>{books?.filter(book => book.categoria === category)[0]?.titulo}</h3>
                                        <p>{books?.filter(book => book.categoria === category)[0]?.sinopsis}</p>
                                    </div>
                                </div>
                            </div>
                            <ScrollableBookList>
                                {books?.filter(book => book.categoria === category)?.map((book, index) => (
                                    <BookCard key={index} book={book} />
                                ))}
                            </ScrollableBookList>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ColoredDivsList