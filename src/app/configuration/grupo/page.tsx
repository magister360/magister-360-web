"use client"

import ErrorMessageInput from "@/app/components/ErrorMessageInput";
import TableGrupo from "./components/TableGrupo";
import { loadSessionFromLocalStorage } from "@/app/sesions/SesionCookies";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { createGrupo, getGrupos } from "./controller/GrupoController";
import { TypeStatusGrupo } from "@/app/utils/TypeStatusGrupo";
import { useEffect, useState } from "react";


export default function Grupo() {
    const [items, setItems] = useState([]);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset } = useForm();

    const onSubmit = async (data: any) => {
        const sesionLocalStorage = loadSessionFromLocalStorage();
        if (!sesionLocalStorage) {
            alert('No inicio sesión')
            router.push('/login')
        } else {
            const userId = sesionLocalStorage?.id ?? -1;
            const save = await createGrupo(
                userId,
                data.grupo,
                TypeStatusGrupo.ALTA
            );
            if (save === true) {
                alert('El grupo se guardo con éxito')
                reset()
            } else {

                alert('Error al guardar')
                reset()
            }
        }

    }


    useEffect(() => {
        const sesionLocalStorage = loadSessionFromLocalStorage();
        if (!sesionLocalStorage) {
            router.push('/login');
            return;
        }

        const fetchGrupos = async () => {
            const userId = sesionLocalStorage?.id ?? -1;
            const grupos = await getGrupos(
                userId,
                TypeStatusGrupo.ALTA);
            if (grupos) {
                
                setItems(grupos);
            }
        };

        fetchGrupos();
    }, [router]);


    return (

        <div className="mt-14 ml-72">
            <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 
                        sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
                <form className="max-w-sm mx-auto mt-10 mb-10"
                    onSubmit={
                        handleSubmit(onSubmit)
                    }>
                    <TableGrupo itempNames={items} />
                    <div className="mb-4 mt-4">
                        <label htmlFor="user" className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white">Grupo</label>
                        <input
                            type="text"

                            id="text-grupo"
                            className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 
                                  dark:focus:border-blue-500"
                            placeholder=""
                            {...register("grupo", {
                                required: "Grupo es requerido",
                                maxLength: { value: 5, message: "Grupo no puede tener más de 5 caracteres" },
                                minLength: { value: 1, message: "Grupo no puede estar vacío" }
                            })} />
                        {errors.grupo && (
                            <ErrorMessageInput message={errors.grupo.message + ""} />
                        )}

                    </div>
                    <button type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-blue-600 dark:hover:bg-blue-700 
                           dark:focus:ring-blue-800  ">Guardar</button>
                </form>
            </div>

        </div>
    );
}