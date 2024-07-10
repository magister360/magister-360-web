"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

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
  idInicioSesion?: string;
  updateContextField: <K extends keyof SidebarContextType>(
    field: K,
    value: SidebarContextType[K]
  ) => void;
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

  const [contextData, setContextData] = useState<SidebarContextType>(() => ({
    visibleSidebar: visibleSidebar,
    setVisibleSidebar: setVisibleSidebar,
    idGrado: undefined,
    idGrupo: undefined,
    idMateria: undefined,
    grado: undefined,
    grupo: undefined,
    materia: undefined,
    idUsuario: undefined,
    nameUser: undefined,
    contenido: undefined,
    idInicioSesion: undefined,
    updateContextField: <K extends keyof SidebarContextType>(
      field: K,
      value: SidebarContextType[K]
    ) => {
      setContextData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    },
  }));



  return (
    <SidebarContext.Provider value={contextData}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
