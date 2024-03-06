'use client'
import 'moment/locale/es'

import moment from 'moment'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { VscKebabVertical } from 'react-icons/vsc'
import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'

import useComment from '@/hooks/useComment'
import Modal from '@/components/common/modal'
import { useUser } from '@/contexts/UserProvider'

export default function CommentsSection({ bookId }) {

    moment.locale('es')
    const COMMENTS_PAGE_SIZE = 5
    const { username } = useUser()
    const { getCommentsByUserAndBook, deleteComment, createComment } = useComment()

    const [comment, setComment] = useState('')
    const [comments, setComments] = useState({ list: [] })
    const [commentsListPage, setCommentsListPage] = useState(1)
    const [commentIdToRemove, setCommentIdToRemove] = useState(null)

    const fetchComments = async () => {
        const data = await getCommentsByUserAndBook({ libro_id: bookId, page: commentsListPage, size: COMMENTS_PAGE_SIZE })
        const { resultado, cant_paginas } = data ?? {}
        let copiaDeComentarios = {...comments}
        setComments({ total_pages: cant_paginas, list: [...copiaDeComentarios.list, ...resultado] })
    }

    const addComment = async () => {
        await createComment({ libro_id: bookId, comentario: comment })
        const data = await getCommentsByUserAndBook({ libro_id: bookId, page: 1, size: COMMENTS_PAGE_SIZE })
        const { resultado, cant_paginas } = data ?? {}
        setCommentsListPage(1)
        setComments({ total_pages: cant_paginas, list: resultado })
        setComment('')
    }

    const removeComment = async () => {
        const result = await deleteComment(commentIdToRemove)
        if (result?.error) {
            toast.error(result?.error)
        } else {
            toast.success('Comentario eliminado correctamente')
            const indexComentario = comments?.list?.findIndex(comment => comment.id === commentIdToRemove)
            let listDeComentarios = [...comments.list]
            listDeComentarios.splice(indexComentario, 1)
            setComments({...comments, list: listDeComentarios })
        }
        setCommentIdToRemove(null)
    }

    useEffect(() => {
        bookId && fetchComments()
    }, [commentsListPage, bookId])

    return (
        <>
            <Modal open={Boolean(commentIdToRemove)}
                onHide={() => setCommentIdToRemove(null)}
                onSave={removeComment}
                title='Eliminar Comentario'>
                <span>¿Estás seguro de eliminar este comentario?</span>
            </Modal>
            <section className='flex flex-wrap'>
                <div className='w-full _lg:w-1/2 px-9 _lg:px-16 min-w-96 py-4 flex flex-col gap-3'>
                    <span className='font-extrabold text-xl'>Comentarios</span>
                    <div className='flex gap-2 flex-wrap justify-end'>
                        <div className='flex gap-2 min-w-80 flex-grow'>
                            <div className='w-8 h-8 rounded-full bg-colorPrimario text-white flex justify-center items-center'>
                                {username?.charAt(0)?.toUpperCase()}
                            </div>
                            <textarea className='text-xs border rounded-lg p-3 flex-grow border-gray-400 outline-none' 
                                placeholder='Añadir un comment' 
                                rows={5}
                                value={comment}
                                onChange={event => setComment(event.target.value)}
                                onFocus={event => event.target.select()}/>
                        </div>
                        <button className='bg-colorPrimario text-white h-9 px-3 rounded-lg disabled:cursor-not-allowed' onClick={addComment} disabled={!Boolean(comment?.trim()?.length)}>
                            Añadir
                        </button>
                    </div>
                </div>
                <div className='w-full _lg:w-1/2 px-9 _lg:px-16 py-4'>
                    <ul>
                        {comments?.list?.map((item, index) =>
                            <li key={index} className='border-b-[1px] border-gray-300 pb-2'>
                                <div className='text-xs flex flex-col gap-2'>
                                    <header className='flex justify-between flex-grow'>
                                        <div className='flex gap-2 items-center h-10'>
                                            <div className='w-8 h-8 rounded-full bg-colorPrimario text-white flex justify-center items-center'>
                                                {item.username.charAt(0).toLocaleUpperCase()}
                                            </div>
                                            <span className='text-black font-bold'>{item.username}</span>
                                            <span className='text-gray-400 whitespace-nowrap'>{moment(item.created_at).startOf('minutes').fromNow()}</span>
                                        </div>
                                        {item.username === username &&
                                            <Popover placement='left'>
                                                <PopoverHandler>
                                                    <button className='h-9'>
                                                        <VscKebabVertical size={15} />
                                                    </button>
                                                </PopoverHandler>
                                                <PopoverContent className='shadow-lg p-1 border-gray-400'>
                                                    <div className='p-1 text-xs text-black'>
                                                            <span className='cursor-pointer text-gray-700 hover:text-black' onClick={() => setCommentIdToRemove(item.id)}>
                                                                Eliminar
                                                            </span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        }
                                    </header>
                                    <p>{item?.comentario}</p>
                                </div>
                            </li>
                        )}
                    </ul>
                    <div className='flex justify-center py-1'>
                        {commentsListPage < comments.total_pages &&
                            <button className='bg-colorPrimario text-white h-9 rounded-md px-3 text-xs' onClick={() => setCommentsListPage(commentsListPage + 1)}>
                                Ver más
                            </button>
                        }
                    </div>
                </div>
            </section>
        </>
    )

}