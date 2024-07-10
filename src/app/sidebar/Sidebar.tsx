import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ExistSesion from "./components/ExistSesion";

export default function SidebarTop() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLButtonElement | null>(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showModal &&
        modalRef.current &&
        imageRef.current &&
        event.target instanceof Node &&
        !modalRef.current.contains(event.target) &&
        !imageRef.current.contains(event.target)
      ) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <nav
      className="fixed top-0 z-50 w-full h-12 bg-[#356169] 
      dark:bg-[#1a2c32]  flex justify-center items-center "
    >
      <div className="flex items-center space-x-2">
        <div className="font-normal dark:text-gray-500 text-gray-300 text-xl">
          LA NUEVA ESCUELA MEXICANA
        </div>
      </div>
      <div className="absolute right-4 flex items-center">
        <div className="mr-auto">
          <div className="text-base font-semibold  dark:text-gray-300 text-gray-100 ">
            Manuel
          </div>
          <div className="font-normal text-gray-300 dark:text-gray-500  ">
            Escalante ramirez
          </div>
        </div>
        <button
          ref={imageRef}
          className="w-6 h-6 relative mr-3 cursor-pointer bg-transparent border-none p-0"
          onClick={toggleModal}
          aria-label="Abrir menú de usuario"
        >
          <Image
            className="rounded-full object-cover ml-4"
            src="/notPhoto.png"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Foto de perfil"
          />
        </button>
        {showModal && <ExistSesion modalRef={modalRef} setShowModal={setShowModal} />}
      </div>
    </nav>
  );
}
