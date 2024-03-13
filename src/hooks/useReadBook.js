const { useUser } = require("@/contexts/UserProvider");
const { headers } = require("next/headers");
const { useState } = require("react");

const useReadBooks = () => {
  const [data, setData] = useState([]);

  const { token } = useUser();

  const getBookById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/capitulos/libro/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { getBookById, data };
};

export default useReadBooks;
