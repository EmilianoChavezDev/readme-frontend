'use client'

import axios from 'axios'
import { useState } from 'react'

const useBook = () => {

    const BOOK_ENDPOINT = '/libros'

    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Create an axios instance with the base URL and token
    const api = axios.create({ baseURL: process.env.API_URL })

    const handleRequest = async requestFunction => {
        setIsLoading(true)
        try {
            const res = await requestFunction()
            return res.data
        } catch (error) {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }

    // Functions to interact with the API
    const createBook = async params => {
        return handleRequest(() => api.post(BOOK_ENDPOINT, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getAllBooks = async params => {
        return handleRequest(() => api.get(BOOK_ENDPOINT, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getBookByID = async id => {
        return handleRequest(() => api.get(`${BOOK_ENDPOINT}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const updateBook = async (id, params) => {
        return handleRequest(() => api.put(`${BOOK_ENDPOINT}/${id}`, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const deleteBook = async id => {
        return handleRequest(() => api.delete(`${BOOK_ENDPOINT}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    return { createBook, getAllBooks, getBookByID, updateBook, deleteBook, error, isLoading }
}

export default useBook
