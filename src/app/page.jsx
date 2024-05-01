'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'

import useBook from '@/hooks/useBook'
import useGetLibros from '@/hooks/useGetLibros'
import BookCard from '@/components/books/BookCard'
import ScrollableBookList from '@/components/books/ScrollableBookList'
import BookListPerCategory from '@/components/books/BookListPerCategory'

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
                        <BookListPerCategory key={index} 
                            category={category}
                            books={books?.filter(book => book.categoria === category)}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ColoredDivsList