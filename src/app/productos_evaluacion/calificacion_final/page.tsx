"use client"
import InfoCardDateGGM from "@/app/components/InfoCardDateGGM";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";

export default function CalificacionFinal() {
  const {
    isMenuVisible,

    grado,
    grupo,
    materia,
  } = useSidebarContext();
  return (
    <div
      className={`mt-16 mr-4  
            ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <div className="mb-4">
        <InfoCardDateGGM grado={grado} grupo={grupo} materia={materia} />
      </div>
    </div>
  );
}
