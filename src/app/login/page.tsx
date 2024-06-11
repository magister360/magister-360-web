"use client"

import { useEffectFetchUsers } from "./hooks/usersHook";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import Image from 'next/image';
import { useState } from "react";
import { getCredentials } from "./services/usersService";
import { encryptString, decryptString } from "../../../security/Security";

export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorCredentials, setErrorCredentials] = useState(false);
    const { users, loading, error } = useEffectFetchUsers();

    if (loading) {
        return <LoadingSpinner message="Cargando usuarios..." />;
    }

    if (error) {
        return <ErrorMessage message={error ?? "Error desconocido"} />
    }

    const handleEncrypt = (textPlain: string) => {
        return encryptString(textPlain);

    };

    const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const encryptedPassword = handleEncrypt(password);
            const credentialsAprove = await getCredentials(userName, encryptedPassword);

            if (credentialsAprove) {
                console.log('Aprobado succefuld++++')
            } else {
                setErrorCredentials(true)
                setTimeout(() => {
                    setErrorCredentials(false)
                }, 5000)
            }

            setUserName('')
            setPassword('')
        } catch (error) {
            setErrorCredentials(true)
            setTimeout(() => {
                setErrorCredentials(false)
            }, 5000)
            setUserName('')
            setPassword('')
        }
    }


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight 
                        text-gray-900 md:text-2xl dark:text-white 
                        flex justify-center items-center">
                            Magister 360
                        </h1>
                        <div className="flex justify-center items-center">

                            <Image
                                className="rounded-full aspect-square object-cover"
                                src="/profesor.jpg"
                                alt="Foto"
                                width={150}
                                height={150}
                                priority
                            />

                        </div>

                        <form className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmitLogin}>
                            <div className="mb-4">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
                                    <input
                                        type="text"
                                        name="text"
                                        value={userName}
                                        id="text"
                                        className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 
                                  dark:focus:border-blue-500"
                                        placeholder=""
                                        onChange={(event) => setUserName(event.target.value)}
                                        autoComplete="username" />

                                </div>
                                <div className="mt-3">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={

                                            password}
                                        placeholder=""
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                                            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                           dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                           dark:focus:border-blue-500"
                                        onChange={(event) =>
                                            setPassword(event.target.value)}
                                        autoComplete="current-password" />
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


                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 
                                            focus:ring-4 focus:outline-none focus:ring-blue-300 
                                            font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                          dark:bg-blue-600 dark:hover:bg-blue-700 
                                          dark:focus:ring-blue-800">Ingresar</button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}