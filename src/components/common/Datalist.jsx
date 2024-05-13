'use client'

import { Input } from '@material-tailwind/react'
import clsx from 'clsx'
import { forwardRef, useRef, useState, useEffect } from 'react'

const Datalist = forwardRef(({ list, value, label = 'Default Label', className = '', onChange, width = 'grow', optionsSize = 5, isLoading, onSave, onFocus, onBlur, onEnter, selectFirstWithEnter = true,...rest}, ref) => {

    const [isFocused, setIsFocused] = useState(false)
    const [posibleOptionIndex, setPosibleOptionIndex] = useState(-1)
    const [frame, setFrame] = useState([0, optionsSize])   

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputRef = ref ?? useRef(null)

    const handleSave = item => {
        item && onChange(item?.value ?? item?.name)
        onSave && onSave(item)
        inputRef?.current?.blur()
    }

    const handleChange = event => {
        let input_text = event.target.value
        let troublesomeCharacters = ['<', '>', '\'', String.fromCharCode(92), '  ', '--', '//']
        if (!troublesomeCharacters?.some(tc => input_text.includes(tc))) {
            onChange(event?.target?.value)
        }
    }

    const handleFocus = event => {
        setIsFocused(true)
        onFocus && onFocus(event)
    }

    const handleBlur = event => {
        setIsFocused(false)
        onBlur && onBlur(event, sortedItems()?.length? sortedItems()[0] : null)
    }

    const handleKeyDown = event => {
        const [frame_base, frame_limit] = frame
        if (event.key === 'ArrowDown') {
            let index_limit = list.length - 1
            let new_index = posibleOptionIndex < index_limit? posibleOptionIndex + 1 : posibleOptionIndex   // prevents the counter from going above the existing amount
            if (new_index >= frame_limit && new_index <= index_limit) {                                     // the frame only changes if the new index does not appear in its range, obs: the limit of the index is the length of the array minus 1
                setFrame([frame_base + 1, frame_limit + 1])                                          
            }
            setPosibleOptionIndex(new_index)
        } else if (event.key === 'ArrowUp') {
            event.preventDefault()                                                                          // prevents the caret from moving to the beginning of the text 
            let new_index = posibleOptionIndex >= 0? posibleOptionIndex - 1 : posibleOptionIndex            // prevents the counter from going below -1
            if (new_index < frame_base && new_index >= 0) {                                                 // the frame only changes if the new index does not appear in its range, obs: index is not negative
                setFrame([frame_base - 1, frame_limit - 1])
            }
            setPosibleOptionIndex(new_index)
        } else if (event.key === 'Enter') {
            event.preventDefault()
            handleSave(list[posibleOptionIndex >= 0? posibleOptionIndex : selectFirstWithEnter? 0 : -1])
            onEnter && onEnter(event)
        }
    }

    const sortedItems = () => {
        const words = value?.trim()?.split(/\s{1,}/g)?.map(c => c.toLowerCase())
        let sortedByMinusLengthFirst = list?.sort((a, b) => (a?.value ?? a?.name)?.length - (b?.value ?? b?.name)?.length)
        let sortedByStartsWithFirst = sortedByMinusLengthFirst?.sort((a, b) => 
            (a?.value ?? a?.name)?.toLowerCase()?.startsWith(words[0]) && (b?.value ?? b?.name)?.toLowerCase()?.startsWith(words[0])? 0 :
            (a?.value ?? a?.name)?.toLowerCase()?.startsWith(words[0]) && !(b?.value ?? b?.name)?.toLowerCase()?.startsWith(words[0])? -1 : 
            1
        )
        return sortedByStartsWithFirst?.map((item, index) => ({...item, index}))?.slice(frame[0], frame[1])
    }

    useEffect(() => {
        if (value?.length) {
            setPosibleOptionIndex(-1)      // when the text is deleted, the posible option is reseted to the next suggestion list
            setFrame([0, optionsSize])
        }
    }, [value])

    return (
        <div className={clsx('relative', width)}>
            <Input inputRef={ref} 
                value={value} 
                label={label} 
                autoComplete='off'
                className={`!border focus:border-colorPrimario`}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                labelProps={{
                    className: `peer-focus:before:!border-colorPrimario peer-focus:after:!border-colorPrimario peer-focus:after:!border-t peer-focus:before:!border-t peer-focus:after:!border-r peer-focus:before:!border-l`,
                }} {...rest} />
            {isFocused &&
                <div className='absolute z-30 bg-white shadow-md cursor-pointer text-sm rounded overflow-hidden !w-full'>
                    {sortedItems()?.map(item => 
                        <div key={item.index} 
                            className={clsx(['px-2 h-10 flex items-center hover:bg-gray-300', item.index === posibleOptionIndex && 'bg-gray-300'])}
                            onMouseDown={() => handleSave(item)}>
                            <span className={`${item.index === posibleOptionIndex? 'text-dark' : ''} ${item.lineThrough? 'line-through' : ''}`}>
                                {item?.value ?? item?.name}
                            </span>
                        </div>
                    )}
                </div>
            }
            {(isLoading && isFocused) &&
                <div className='h-8 w-8 absolute top-2 right-2'>
                    <span className='text-gray-600'>
                            <RiLoader4Fill size={18} />
                    </span>
                </div>
            }
        </div>
    )

})

export default Datalist