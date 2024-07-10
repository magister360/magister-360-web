// useFetchUsers.ts
import { useState, useEffect, useRef } from "react";
import { getCountUsers } from "../controller/UsersController";

export const useEffectFetchUsers = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const refFetch = useRef<boolean>(false);

  useEffect(() => {
    const fetchDataUsers = async () => {
      setLoading(true);

      try {
        await getCountUsers();
      } catch (error) {
      
      } finally {
        setLoading(false);
      }
    };

    if (!refFetch.current) {
      fetchDataUsers();
      refFetch.current = true;
    }
  }, []);

  return { loading, error };
};
