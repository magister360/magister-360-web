import { useState, useEffect, useRef } from "react";
import { UserLogeado } from "@/app/types/TypesLoginRecords";
import { getUserLogeado } from "@/app/login/controller/UsersController";
import { useSidebarContext } from "../SidebarContext";

export const useUserLogeado = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const refFetch = useRef<boolean>(false);
  const [userLogeado, setUserLogeado] = useState<UserLogeado | null>(null);
  const { idUsuario } = useSidebarContext();

  useEffect(() => {
    const fetchDataUsers = async () => {
      setLoading(true);
      try {
        const lastUserLogin = await getUserLogeado(idUsuario);
        setUserLogeado(lastUserLogin);
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

  return { loading, userLogeado };
};
