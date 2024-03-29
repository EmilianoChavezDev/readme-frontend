import { useState } from "react";
import axios from "axios";

const CATEGORY_ENDPOINT = "/libros_categorias"
const useCategory = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(process.env.API_URL+CATEGORY_ENDPOINT, {
        headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      });

      if (response.status < 200 || response.status >= 300) {
        throw error;
      }

      const data = await response.data;
      setData(data);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  return { data, loading, error, fetchCategories };
};

export default useCategory;
