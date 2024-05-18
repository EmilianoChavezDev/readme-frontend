'use client'

import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { AccountProvider } from '@/contexts/AccountProvider'
import { useUser } from '@/contexts/UserProvider'

export default function RootLayout({ children }) {

    const pathname = usePathname()

    const { role } = useUser()

    const [lineWidth, setLineWidth] = useState(0)
    const [linePosition, setLinePosition] = useState(0)
    const [showAddModeratorModal, setShowAddModeratorModal] = useState(false)
    const [paths, setPaths] = useState([
        { path: '/about/privacy_policy', name: 'Politicas de Privacidad', show: true },
        { path: '/about/terms_of_service', name: 'Terminos de Servicio', show: true },
        { path: '/about/tecnologies', name: 'Tecnologias', show: true },
        { path: '/about/faq', name: 'Preguntas Frecuentes', show: role === 'administrador' }
    ])

    const handleTabClick = index => {
        const tabElement = document.getElementById(`tab-${index}`)
        if (tabElement) {
            setLinePosition(tabElement.offsetLeft)
            setLineWidth(tabElement.offsetWidth)
        }
    }
    return (
        <AccountProvider showAddModeratorModal={showAddModeratorModal} setShowAddModeratorModal={setShowAddModeratorModal}>
            <div className='relative flex flex-col gap-3 px-20 py-9 items-center'>
                
                <h1 font-boldh1 className='text-6xl font-bold leading-8 pb-5'>
                    Centro de Privacidad
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
                    
                </div>
                {children}
            </div>
        </AccountProvider>
    )

}  
