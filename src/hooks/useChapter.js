'use client'

import axios from 'axios'
import { useState } from 'react'

const useChapter = () => {

    const CHAPTER_ENDPOINT = '/capitulos'

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
    const createChapter = async params => {
        return handleRequest(() => api.post(CHAPTER_ENDPOINT, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/pdf' } }))
    }
    
    const getChapterByID = async id => {
        return handleRequest(() => api.get(`${CHAPTER_ENDPOINT}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const updateChapter = async (id, params) => {
        return handleRequest(() => api.put(`${CHAPTER_ENDPOINT}/${id}`, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/pdf' } }))
    }

    const publishChapter = async id => {
        return handleRequest(() => api.put(`${CHAPTER_ENDPOINT}/publicar/${id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'aplication/json' } }))
    }

    const getChapterByBook = async id => {
        return handleRequest(() => api.get(`${CHAPTER_ENDPOINT}/libro/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}))
    }

    const deleteChapter = async (id) => {
        return handleRequest(() => api.delete(`${CHAPTER_ENDPOINT}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const swapChapter = async (capitulo1Id, capitulo2Id) => {
        return handleRequest(() => api.put(`/swap/${CHAPTER_ENDPOINT}`, { capitulo1_id: capitulo1Id, capitulo2_id: capitulo2Id }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }))
    }

    return { createChapter, getChapterByID, publishChapter, updateChapter, getChapterByBook, deleteChapter, swapChapter, error, isLoading }
    
}

export default useChapter
