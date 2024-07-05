"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { loadSessionFromLocalStorage } from "../sesions/SesionCookies";
import { loadSelectionGGMFromLocalStorage } from "../selection/SelectionGGMCookies";

interface SidebarContextType {
  visibleSidebar: boolean;
  setVisibleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  idGrado?: number;
  idGrupo?: number;
  idMateria?: number;
  grado?: string;
  grupo?: string;
  materia?: string;
  idUsuario?: number;
  nameUser?: string;
  contenido?: string;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};

type SidebarProviderProps = {
  children: React.ReactNode;
};

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const router = useRouter();
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const [contextData, setContextData] = useState<SidebarContextType>({
    visibleSidebar,
    setVisibleSidebar,
    idGrado: undefined,
    idGrupo: undefined,
    idMateria: undefined,
    grado: undefined,
    grupo: undefined,
    materia: undefined,
    idUsuario: undefined,
    nameUser: undefined,
    contenido: undefined,
  });

  useEffect(() => {
    const sessionCookie = loadSessionFromLocalStorage();
    const selectionCookie = loadSelectionGGMFromLocalStorage();

    if (sessionCookie && selectionCookie) {
      setVisibleSidebar(true);
      setContextData({
        visibleSidebar: true,
        setVisibleSidebar,
        idGrado: selectionCookie.idGrado,
        idGrupo: selectionCookie.idGrupo,
        idMateria: selectionCookie.idMateria,
        grado: selectionCookie.grado,
        grupo: selectionCookie.grupo,
        materia: selectionCookie.materia,
        idUsuario: sessionCookie.id,
        nameUser: sessionCookie.userName,
        contenido: undefined,
      });
      router.refresh();
      router.push("/");
    } else {
      setVisibleSidebar(false);
      setContextData({
        visibleSidebar: false,
        setVisibleSidebar,
        idGrado: undefined,
        idGrupo: undefined,
        idMateria: undefined,
        grado: undefined,
        grupo: undefined,
        materia: undefined,
        idUsuario: undefined,
        nameUser: undefined,
        contenido: undefined
      });
      router.refresh();
      router.push("/login");
    }
  }, []);

  return (
    <SidebarContext.Provider value={contextData}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
