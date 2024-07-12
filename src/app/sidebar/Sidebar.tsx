import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ExistSesion from "./components/ExistSesion";
import Loading from "../components/Loading";
import { useUserLogeado } from "./hooks/UserLogeadoHook";

export default function SidebarTop() {
  const [showModal, setShowModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLButtonElement | null>(null);
  const { loading, userLogeado } = useUserLogeado();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
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
  }, [modalRef, imageRef]);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  };

  const imagePhotoSource = userLogeado?.foto || "/notPhoto.PNG";

  if (loading) {
    return <Loading isLoading={loading} />;
  }
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
        <button
          onClick={toggleDarkMode}
          className="mr-4 p-1 rounded-full bg-gray-200 dark:bg-gray-700"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-900"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
        <div className="mr-auto">
          <div className="text-base font-semibold  dark:text-gray-300 text-gray-100 ">
            {userLogeado?.nombre}
          </div>
          <div className="font-normal text-gray-300 dark:text-gray-500  ">
            {userLogeado?.apellidoPaterno} {userLogeado?.apellidoMaterno}
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
            src={imagePhotoSource}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Foto de perfil"
          />
        </button>
        {showModal && (
          <ExistSesion modalRef={modalRef} setShowModal={setShowModal} />
        )}
      </div>
    </nav>
  );
}
