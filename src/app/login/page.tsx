"use client";

import { useEffectFetchUsers } from "./hooks/usersHook";
import ErrorMessage from "../components/ErrorMessage";
import Image from "next/image";
import { useState } from "react";
import { getCredentials } from "./services/usersService";
import { encryptString } from "../../../security/Security";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import { createInicioSesion } from "./controller/InicioSesionController";
import { useSidebarContext } from "../sidebar/SidebarContext";
import { v4 as uuidv4 } from "uuid";

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorCredentials, setErrorCredentials] = useState(false);
  const { loading, error, lastUser } = useEffectFetchUsers();
  const { updateContextField } = useSidebarContext();

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (error) {
    return <ErrorMessage message={error ?? "Error desconocido"} />;
  }

  const handleEncrypt = (textPlain: string) => {
    return encryptString(textPlain);
  };

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const encryptedPassword = handleEncrypt(password);
      const credentialsAprove = await getCredentials(
        userName,
        encryptedPassword
      );

      if (credentialsAprove.approve) {
        const id = uuidv4();
        updateContextField("idUsuario", credentialsAprove.id);
        updateContextField("nameUser", credentialsAprove.userName);
        updateContextField("idInicioSesion", id);
        await createInicioSesion(id, credentialsAprove.id);
        router.refresh();
        router.push("/sectionGGM");
      } else if (!credentialsAprove.approve) {
        setErrorCredentials(true);
        setTimeout(() => {
          setErrorCredentials(false);
        }, 5000);
      }

      setUserName("");
      setPassword("");
    } catch (error) {
      setErrorCredentials(true);
      setTimeout(() => {
        setErrorCredentials(false);
      }, 5000);
      setUserName("");
      setPassword("");
    }
  };

  const imagePhotoSource = lastUser?.foto ?? "/notPhoto.PNG";

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0
                 dark:bg-[#1a2c32] dark:border-gray-700"
      >
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex justify-center items-center">
            <Image
              className="rounded-full aspect-square object-cover"
              src={imagePhotoSource}
              alt="Foto"
              width={150}
              height={150}
              priority
            />
          </div>

          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmitLogin}
            method="POST"
          >
            <div className="mb-4">
              <div>
                <label
                  htmlFor="user"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  name="text"
                  value={userName}
                  id="text"
                  className=" bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-gray-500 
                                  dark:focus:border-gray-500"
                  placeholder=""
                  onChange={(event) => setUserName(event.target.value)}
                  autoComplete="username"
                />
              </div>
              <div className="mt-3">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
                   rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                    dark:bg-[#1a2c32] dark:border-gray-600 dark:placeholder-gray-400
                     dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {errorCredentials ? (
              <div className="h-24 bg-white p-2 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-1">Error</h1>
                <p className="text-gray-700">Usuario o contraseña invalida</p>
              </div>
            ) : (
              <></>
            )}

            <button
              type="submit"
              className="w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] "
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
