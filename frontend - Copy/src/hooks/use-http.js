import { useCallback, useState } from "react";

const useHttp = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (requestObj, processData) => {
    let data;
    try {
      const response = await fetch(requestObj.url, {
        method: requestObj.method ? requestObj.method : "GET",
        headers: requestObj.headers ? requestObj.headers : {},
        body: requestObj.body ? JSON.stringify(requestObj.body) : null,
      });
      if (!response.ok) {
        throw new Error(`Error! ${response.status}`);
      }
      data = await response.json();
    } catch (error) {
      // setIsError(true);
      // setError(error);
      
      console.error(error);
    }
    processData(data);
  }, []);
  return [sendRequest, isError, error];
};

export default useHttp;
