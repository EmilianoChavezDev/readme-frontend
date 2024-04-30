'use client'

import { useEffect, useRef, useState } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'

export default function ScrollableBookList({ children }) {

    const [scrollLeftVisible, setScrollLeftVisible] = useState(false)
    const [scrollRightVisible, setScrollRightVisible] = useState(false)

    const containerRef = useRef(null)

    const handleScroll = direction => {
        const container = containerRef.current
        if (container) {
        const scrollAmount = container.clientWidth * 0.85
        if (direction === 'left') {
            container.scrollLeft -= scrollAmount
        } else {
            container.scrollLeft += scrollAmount
        }
        }
    }

    const checkScroll = () => {
        const container = containerRef.current
        if (container) {
            setScrollLeftVisible(container.scrollLeft > 0)
            setScrollRightVisible(Math.round(container.scrollLeft) < (container.scrollWidth - container.clientWidth))
        }
    }

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            setScrollRightVisible(container.scrollWidth > container.clientWidth)
        }
    }, [children])

    return (
        <div className='relative'>
            {scrollLeftVisible && 
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-14 h-full z-100 pt-1`}>
                    <button className={`bg-gradient-to-r from-colorPrimario to-transparent hover:from-colorHoverPrimario outline-none border-none w-full h-full flex justify-start items-center`}
                        onClick={() => handleScroll('left')} >
                        <span className='text-black'>
                            <GoChevronLeft size={24} />
                        </span>
                    </button>
                </div>
            }
            <div ref={containerRef}
                className='flex overflow-x-auto space-x-6 pl-9 pr-4 pt-3 pb-1'
                onScroll={checkScroll}
                style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', maxWidth: '100%', scrollbarWidth: 'none', msOverflowStyle: 'none' }} >
                {children}
            </div>
            {scrollRightVisible && 
                <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-14 h-full z-100 pt-1'>
                    <button className={`bg-gradient-to-r from-transparent to-colorPrimario hover:to-colorHoverPrimario outline-none border-none w-full h-full flex justify-end items-center`}
                        onClick={() => handleScroll('right')} >
                        <span>
                            <GoChevronRight size={24} />
                        </span>
                    </button>
                </div>
            }
        </div>
    )

}