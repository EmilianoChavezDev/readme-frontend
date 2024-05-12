'use client'

import Link from 'next/link'
import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { VscChevronRight } from 'react-icons/vsc'

import { useUser } from '@/contexts/UserProvider'
import { AccountProvider } from '@/contexts/AccountProvider'

export default function RootLayout({ children }) {

    const pathname = usePathname()

    const { role } = useUser()

    const [lineWidth, setLineWidth] = useState(0)
    const [linePosition, setLinePosition] = useState(0)
    const [showAddModeratorModal, setShowAddModeratorModal] = useState(false)
    const [paths, setPaths] = useState([
        { path: '/accounts/admin/banned_books', name: 'Libros Baneados', show: true },
        { path: '/accounts/admin/banned_users', name: 'Usuarios Baneados', show: true },
        { path: '/accounts/admin/banned_comments', name: 'Comentarios Baneados', show: true },
        { path: '/accounts/admin/manage_moderators', name: 'Moderadores', show: role === 'moderador' }
    ])

    const handleTabClick = index => {
        const tabElement = document.getElementById(`tab-${index}`)
        if (tabElement) {
            setLinePosition(tabElement.offsetLeft)
            setLineWidth(tabElement.offsetWidth)
        }
    }

    useEffect(() => {
        let index = paths?.findIndex(tab => pathname.startsWith(tab.path))
        handleTabClick(index)
    }, [pathname])

    useEffect(() => {
        if (role === 'moderador') {
            let pathsCopy = [...paths] 
            pathsCopy.pop()
            setPaths([...pathsCopy, { path: '/accounts/admin/manage_moderators', name: 'Moderadores', show: role === 'moderador' }])
        }
    }, [role])
    
    return (
        <AccountProvider showAddModeratorModal={showAddModeratorModal} setShowAddModeratorModal={setShowAddModeratorModal}>
            <div className='relative flex flex-col gap-3 px-20 py-9'>
                <div className='flex gap-2 items-center'>
                    <Link href='/accounts' className='font-semibold text-gray-800'>
                        Cuenta
                    </Link>
                    <span>
                        <VscChevronRight />
                    </span>
                    <span className='font-semibold text-gray-800'>
                        Administración
                    </span>
                </div>
                <h1 className='font-bold text-gray-800 text-3xl leading-8'>
                    Administración
                </h1>
                <div className='flex justify-between h-10 items-center'>
                    <ul className='relative flex items-end'>
                        {paths?.map((tab, index) => (
                            <Link href={tab.path} legacyBehavior key={index}>
                                <li id={`tab-${index}`} className={`flex gap-1 px-3 pb-1 text-lg cursor-pointer hover:scale-105 transform transition-all duration-[0.2s] ease-[ease-in-out] ${pathname.startsWith(tab.path)? 'text-pastelOrange' : 'text-gray-700'} ${tab.show? 'flex' : 'hidden'}`} 
                                    onClick={() => handleTabClick(index)} >
                                    <span>{tab.name}</span>
                                </li>
                            </Link>
                        ))}
                        <div className={`${paths?.find(tab => pathname.startsWith(tab.path))? 'block' : 'hidden'} border-b-2 border-colorPrimario absolute bottom-0 left-0 transition-transform duration-300 ease-in-out z-30`}
                            style={{ width: `${lineWidth}px`, transform: `translateX(${linePosition}px)` }} />
                    </ul>
                    {role === 'moderador' && pathname === '/accounts/admin/manage_moderators' &&
                        <button className='h-10 px-2 rounded-md bg-colorPrimario hover:bg-colorHoverPrimario text-white flex items-center gap-1'
                            onClick={() => setShowAddModeratorModal(true)}>
                            <PlusIcon />
                            <span>Agregar Moderador</span>
                        </button>
                    }
                </div>
                {children}
            </div>
        </AccountProvider>
    )

}  
