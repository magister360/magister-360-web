"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSidebarContext } from "../sidebar/SidebarContext";

export const AuthCheck = () => {
  const router = useRouter();
  const { idUsuario } = useSidebarContext();

  useEffect(() => {
    if (idUsuario === undefined) {
      router.push("/login");
    }
  }, [idUsuario, router]);

  return null;
};
