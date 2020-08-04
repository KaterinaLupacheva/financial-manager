import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase/firebase";

const useFetchData = (initialUrl) => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            try {
              const token = await user.getIdToken();
              const result = await axios(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(result);
              setData(result.data);
              setIsLoading(false);
            } catch (err) {
              setIsError(true);
            }
          }
        });
      } catch (error) {
        setIsError(true);
      }
    };
    if (url !== "") {
      fetchData();
    }
  }, [url]);

  return [{ data, isLoading, isError }, setUrl, setData];
};

export default useFetchData;
