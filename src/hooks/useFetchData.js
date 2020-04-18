import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = initialUrl => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("FBIdToken")}`
          }
        });
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    if (url !== "") {
      fetchData();
    }
  }, [url]);

  return [{ data, isLoading, isError }, setUrl, setData];
};

export default useFetchData;
