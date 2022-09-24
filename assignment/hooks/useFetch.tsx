import { useState, useEffect } from 'react';
// we can use axios as well
interface Ret {
  data: any | null;
  loading: Boolean;
  error: string;
}
const useFetch = (url: string, options?: object): Ret => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string>('');

  const controller = new AbortController();
  useEffect(() => {
    setLoading(true);
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        if (controller.signal.aborted) {
          console.log('The user aborted the request');
        } else {
          console.error('The request failed');
        }
        setError(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
