import { createFinSesion } from "../controller/FinSesionController";
import { useSidebarContext } from "../SidebarContext";
import { useRouter } from "next/navigation";

interface ExistSesionProps {
  modalRef: React.RefObject<HTMLDivElement>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExistSesion: React.FC<ExistSesionProps> = ({
  modalRef,
  setShowModal,
}) => {
  const router = useRouter();
  const { idUsuario, idInicioSesion, updateContextField } = useSidebarContext();

  const handleCerrarSesion = async () => {
    await createFinSesion(idUsuario, idInicioSesion)
      .then(() => {
        clearCerrarSesion();
      })
      .catch((error) => {})
      .finally(() => {
        setShowModal(false);
        router.push("/login");
      });
  };
  const clearCerrarSesion = async () => {
    updateContextField("idUsuario", 0);
    updateContextField("idInicioSesion", "");
    updateContextField("grado", "");
    updateContextField("idGrado", -1);
    updateContextField("grupo", "");
    updateContextField("idGrupo", -1);
    updateContextField("materia", "");
    updateContextField("idMateria", -1);
    updateContextField("visibleSidebar", false);
  };

  const handleCambiarGrupo = async () => {
    updateContextField("visibleSidebar", false);
    router.push("/sectionGGM");
    setShowModal(false);
  };

  const handleloginRecords = async () => {
    router.push("/login_records");
    setShowModal(false);
  };

  return (
    <div
      ref={modalRef}
      className="absolute right-0 mt-40 w-48 bg-white rounded-md shadow-lg py-1 z-50"
    >
      <button
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
        onClick={handleloginRecords}
      >
        Sesiones
      </button>
      <button
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
        onClick={handleCambiarGrupo}
      >
        Cambiar de grupo
      </button>
      <button
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
        onClick={handleCerrarSesion}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default ExistSesion;
