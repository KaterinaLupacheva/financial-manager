import React, { useState, useEffect } from "react";
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
        console.log("Error " + error);
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  // console.log(data, isLoading, isError);

  return [{ data, isLoading, isError }, setUrl];
};

export default useFetchData;
