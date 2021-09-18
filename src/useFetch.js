import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCtrl = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCtrl.signal })
        .then(res => {
          if(!res.ok) {
            throw Error('Could not fetch data from the server');
          }
          return res.json();
        })
        .then(data => {
          setData(data);
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          if(err.name === 'AbortError') {
            console.log('fetch aborted');
          } else {
            setError(err.message);
            setIsLoading(false);
          }
        })
    }, 1000);

    return () => abortCtrl.abort(); // This throws an error
  }, [url]);

  return {data, isLoading, error};
}

export default useFetch;