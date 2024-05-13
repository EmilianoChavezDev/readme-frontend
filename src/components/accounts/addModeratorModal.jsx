'use client'

import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi2'
import { Dialog } from '@material-tailwind/react'

import useUserInfo from '@/hooks/useUser'
import Datalist from '@/components/common/Datalist'

export default function AddModeratorModal({ show, onHide, onSave }) {

    const { searchUserByUsername, updateUserRole } = useUserInfo()

    const [userSuggestions, setUserSuggestions] = useState([])
    const [currentUsersList, setCurrentUsersList] = useState([])
    const [usernameToSearch, setUsernameToSearch] = useState('')

    const handleSearchUser = async () => {
        const result = usernameToSearch.length >= 2? await searchUserByUsername(usernameToSearch) : { users: [] }
        setUserSuggestions(result?.users?.map(user => ({...user, value: `${user.username} - ${user.role}`, lineThrough: user.role === 'moderador' || user.role === 'administrador' || Boolean(currentUsersList?.find(u => u.id === user.id))})))
    }

    const handleSelectUser = user => {
        setUsernameToSearch('')
        if (user) {
            if (user.role === 'usuario') {
                if (Boolean(currentUsersList?.find(u => u.id === user.id))) {
                    return toast.error('El usuario ya se encuentra en la lista')
                } else {
                    setCurrentUsersList([...currentUsersList, user])
                }
            } else {
                return toast.error('Solo puedes asignar como moderador a alguien con rol usuario')
            }
        }
    }

    const handleUpdateUsersRoles = async () => {
        try {
            const fetchPromises = currentUsersList.map(user =>
                updateUserRole({ id: user.id, role: 'moderador' })
            )
            const result = await Promise.all(fetchPromises)
            toast.success(currentUsersList?.length === 1? 'El rol de este usuario ha sido actualizado' : 'Todos los roles de estos usuarios se han actualizado')
            setCurrentUsersList([])
            onSave(result)
            onHide()
        } catch (error) {
            toast.error('Hubo un error al actualizar los roles de moderador')
        }
    }

    const handleRemoveFromList = userId => {
        const list = currentUsersList?.filter(user => user.id !== userId)
        setCurrentUsersList(list)
    }

    useEffect(() => {
        handleSearchUser()
    }, [usernameToSearch])

    return (
        <Dialog open={show} handler={onHide} size='xs'>
            <div className='p-3 flex flex-col gap-3'>
                <h1 className='text-center text-gray-900 text-xl'>Agregar Nuevo Moderador</h1>
                <Datalist label='Buscar por username'
                    list={userSuggestions}
                    onFocus={event => event.target.select()}
                    value={usernameToSearch}
                    onChange={setUsernameToSearch}
                    onSave={handleSelectUser} />
                <div className='flex flex-col'>
                    {currentUsersList?.map((user, index) =>
                        <div className='group text-sm h-8 text-gray-900 hover:bg-gray-100 transition-all duration-300 flex justify-between items-center' 
                            key={index}>
                                <span>
                                    {`${index + 1} - ${user?.username}`}
                                </span>
                                <button className='outline-none border-none text-red-200 hidden group-hover:flex hover:text-red-500'
                                    onClick={() => handleRemoveFromList(user.id)}>
                                    <HiOutlineTrash size={22} />
                                </button>
                        </div>
                    )}
                </div>
                <div className='flex justify-end'>
                    <button className='h-9 rounded-md px-2 bg-colorPrimario text-white hover:bg-colorHoverPrimario disabled:cursor-not-allowed' 
                        disabled={!currentUsersList?.length}
                        onClick={handleUpdateUsersRoles}>
                        Agregar
                    </button>
                </div>
            </div>
        </Dialog>
    )

}