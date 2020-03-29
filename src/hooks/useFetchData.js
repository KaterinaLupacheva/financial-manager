import React, { useState, useEffect } from "react";
import axios from "axios";
import { createDataForTable } from "../utils/formatData";

const useFetchData = () => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(
    `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/incomes/2020-01-01/2020-03-31`
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        console.log("URL " + url);
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

  console.log(data, isLoading, isError);

  return [{ data, isLoading, isError }, setUrl];
};

export default useFetchData;
