'use client'

import axios from 'axios';
import { useState } from 'react';

const useDraft = () => {
    const DRAFTS_ENDPOINT = '/libros_con_capitulos_no_publicados';

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Crear una instancia de axios con la URL base y el token
    const api = axios.create({ baseURL: process.env.API_URL });

    const handleRequest = async requestFunction => {
        setIsLoading(true);
        try {
            const res = await requestFunction();
            return res.data;
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para obtener borradores
    const getDrafts = async () => {
        return handleRequest(() => api.get(DRAFTS_ENDPOINT, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }));
    };

    return { getDrafts, error, isLoading };
};

export default useDraft;
