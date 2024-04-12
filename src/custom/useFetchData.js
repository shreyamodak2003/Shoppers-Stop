import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchData(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const r = await axios.get(url);
        const d = r.data;
        setError(false);
        setData((prev) => d);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}