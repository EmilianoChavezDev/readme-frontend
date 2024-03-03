'use client'

import axios from 'axios'
import { useState } from 'react'

const useComment = () => {

    const COMMENTS_ENDPOINT = '/comentarios'

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
    const createComment = async params => {
        return handleRequest(() => api.post(COMMENTS_ENDPOINT, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getAllComments = async params => {
        return handleRequest(() => api.get(COMMENTS_ENDPOINT, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getCommentsByUserAndBook = async params => {
        return handleRequest(() => api.get(`${COMMENTS_ENDPOINT}/find_by`, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getCommentByID = async id => {
        return handleRequest(() => api.get(`${COMMENTS_ENDPOINT}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const updateComment = async (id, params) => {
        return handleRequest(() => api.put(`${COMMENTS_ENDPOINT}/${id}`, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const deleteComment = async id => {
        return handleRequest(() => api.delete(`${COMMENTS_ENDPOINT}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    return { createComment, getAllComments, getCommentByID, updateComment, deleteComment, getCommentsByUserAndBook, error, isLoading }
}

export default useComment