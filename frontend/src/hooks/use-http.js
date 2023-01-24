import { useCallback } from "react";

// A costum hook that handles http requests. Parameters are the request Object
// as well as two functions, processdata wich handles returning data in case of
// successful request and errorHandler wich handles errors in case of erros
const useHttp = () => {
  const sendRequest = useCallback(
    async (requestObj, processData, errorHandler) => {
      let data;
      console.log("senRequest");
      try {
        const response = await fetch(requestObj.url, {
          method: requestObj.method ? requestObj.method : "GET",
          headers: requestObj.headers ? requestObj.headers : {},
          body: requestObj.body ? JSON.stringify(requestObj.body) : null,
        });
        data = await response.json();
        if (!response.ok) {
          console.log("hér núna");
          throw new Error(`${data.message}`);
        }
        processData(data);
      } catch (error) {
        errorHandler(error);
      }
    },
    []
  );
  return sendRequest;
};

export default useHttp;
