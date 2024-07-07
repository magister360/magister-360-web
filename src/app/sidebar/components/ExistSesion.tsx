interface ExistSesionProps {
  modalRef: React.RefObject<HTMLDivElement>;
}

const ExistSesion: React.FC<ExistSesionProps> = ({ modalRef }) => {
  {
    return (
      <>
        <div
          ref={modalRef}
          className="absolute right-0 mt-40 w-48 bg-white rounded-md shadow-lg py-1 z-50"
        >
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={() => {}}
          >
            Cerrar sesión
          </button>
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={() => {}}
          >
            Cambiar de grupo
          </button>
        </div>
      </>
    );
  }
};

export default ExistSesion;
