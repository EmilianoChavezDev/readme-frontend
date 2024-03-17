'use client'

import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import useChapter from '@/hooks/useChapter'
import Loader from '@/components/common/loader'
import ChapterForm from '@/components/chapters/ChapterForm'

export default function UpdateChapter({ params }) {

    const router = useRouter()
    const { getChapterByID, updateChapter, publishChapter, isLoading, error } = useChapter()

    const [chapter, setChapter] = useState()

    const fetchChapter = async () => {
        const result = await getChapterByID(params.chapterId)
        if (!result) {
            toast.error('Capítulo no encontrado')
        } else {
            setChapter(result)
        }
    }

    const handleSave = async values => {
        const createdChapter = await updateChapter(params.chapterId, values)
        if (createdChapter) {
            toast.success('El capítulo de tu libro ha sido guardado')
            router.push('/drafts')
        } else {
            toast.error('El capítulo de tu libro no se pudo guardar')
        }
    }

    const handlePublish = async values => {
        const createdChapter = await updateChapter(params.chapterId, values)
        if (createdChapter) {
            const publishedChapter = await publishChapter(createdChapter?.id)
            if (publishedChapter) {
                toast.success('El capítulo de tu libro ha sido publicado')
            } else {
                toast.error('El capítulo se ha guardado pero no pudo ser publicado')
            }
            router.push(`/books/${params.id}`)
        } else {
            toast.error('El capítulo de tu libro no se pudo guardar')
        }
    }

    useEffect(() => {
        fetchChapter()
    }, [])

    return (
        <>
            {error?
                <div className='flex justify-center items-center'>
                    <h1>El capítulo de este libro no fue encontrado</h1>
                </div> :
                <>
                    {isLoading && <Loader />}
                    <ChapterForm bookId={params.id} chapter={chapter} onSave={handleSave} onPublish={handlePublish} />
                </>
            }
        </>
    )
}
