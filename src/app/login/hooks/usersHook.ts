// useFetchUsers.ts
import { useState, useEffect, useRef } from "react";
import { getCountUsers, getUltimoUser } from "../controller/UsersController";
import { LastUser } from "@/app/types/TypesLoginRecords";

export const useEffectFetchUsers = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const refFetch = useRef<boolean>(false);
  const [lastUser, setLastUser] = useState<LastUser | null>(null);

  useEffect(() => {
    const fetchDataUsers = async () => {
      setLoading(true);

      try {
        await getCountUsers();
        const lastUserLogin = await getUltimoUser();
        setLastUser(lastUserLogin);
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

  return { loading, error, lastUser };
};
