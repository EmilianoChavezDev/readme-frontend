import { useState } from "react";
import axios from "axios";
import { useUser } from "@/contexts/UserProvider";

const useDraft = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useUser(); 

  const getDraftsUser = async () => {
    try {
      const res = await axios.get(`${process.env.API_URL}/libros_con_capitulos_no_publicados`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return { getDraftsUser, error, isLoading };
};

export default useDraft;
