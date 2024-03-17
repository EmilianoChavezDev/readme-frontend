'use client'

import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import useChapter from '@/hooks/useChapter'
import ChapterForm from '@/components/chapters/ChapterForm'

export default function WriteChapter({ params }) {

    const router = useRouter()
    const { createChapter, publishChapter } = useChapter()

    const handleSave = async values => {
        const createdChapter = await createChapter(values)
        if (createdChapter) {
            toast.success('El capítulo de tu libro ha sido guardado')
            router.push(`/books/${params.id}`)
        } else {
            toast.error('El capítulo de tu libro no se pudo guardar')
        }
    }

    const handlePublish = async values => {
        const createdChapter = await createChapter(values)
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

    return (
        <ChapterForm bookId={params.id} onSave={handleSave} onPublish={handlePublish} />
    )
}
