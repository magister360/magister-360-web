"use client"

import ErrorMessageInput from "@/app/components/ErrorMessageInput";
import TableGrupo, { ItemGrupo, getIdGrupo, getStrGrupo } from "./components/TableGrupo";
import { loadSessionFromLocalStorage } from "@/app/sesions/SesionCookies";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { createGrupo, getGrupos, removeGrupo, updateGrupo } from "./controller/GrupoController";
import { TypeStatusGrupo } from "@/app/utils/TypeStatusGrupo";
import { useEffect, useState } from "react";
import Image from 'next/image';


export default function Grupo() {
    const [items, setItems] = useState([]);
    const router = useRouter();
    const [newModify, setNewModify] = useState(true);
    const [idSelect, setIdSelect] = useState(-1);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue } = useForm();


    const onSubmit = async (data: any) => {
        const sesionLocalStorage = loadSessionFromLocalStorage();
        if (!sesionLocalStorage) {
            alert('No inicio sesión')
            router.push('/login')
        } else {
            const userId = sesionLocalStorage?.id ?? -1;
            if (newModify) {
                const save = await createGrupo(
                    userId,
                    data.grupo,
                    TypeStatusGrupo.ALTA
                );
                if (save === true) {
                    fetchGrupos();
                    alert('El grupo se guardo con éxito')
                    reset()
                } else {

                    alert('Error al guardar')
                    reset()
                }
            } else {
                const save = await updateGrupo(
                    idSelect,
                    data.grupo
                );
                if (save === true) {
                    fetchGrupos();
                    alert('El grupo se modifico con éxito')
                    reset()
                } else {
                    alert('Error al guardar')
                    reset()
                }
                handleClickNew()
            }
        }
    }

    const fetchGrupos = async () => {
        const sesionLocalStorage = loadSessionFromLocalStorage();
        if (!sesionLocalStorage) {
            router.refresh()
            router.push('/login');
            return;
        }
        const userId = sesionLocalStorage?.id ?? -1;
        const grupos = await getGrupos(
            userId,
            TypeStatusGrupo.ALTA);
        if (grupos) {
            setItems(grupos);
        }
    };

    useEffect(() => {
        fetchGrupos();
    }, []);


    const handleClickRemove = async (items: ItemGrupo[], index: number) => {
        const confirmar = window.confirm("¿Está seguro de eliminar la grupo?");
        if (confirmar) {
            const id = getIdGrupo(items = items, index);

            const remove = await removeGrupo(id, TypeStatusGrupo.REMOVE);
            if (remove) {
                await fetchGrupos();
            } else {
                alert('Error no es posible eliminar')
            }
            handleClickNew();
        }
    };


    const handleClickUpdate = async (items: ItemGrupo[], index: number) => {

        const id = getIdGrupo(items = items, index);
        const value = getStrGrupo(items = items, index)
        setIdSelect(id)
        setValue('grupo', value)
        setNewModify(false)
    };

    const handleClickNew = () => {
        setIdSelect(-1)
        reset()
        setNewModify(true)
    };
    return (


        <div className="ml-72 md:mt-14 pt-2 pb-2 rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff] ">
            <form className="max-w-sm mx-auto mt-10 mb-10"
                onSubmit={
                    handleSubmit(onSubmit)
                }>
                <TableGrupo items={items}
                    handleClickRemove={handleClickRemove}
                    handleClickUpdate={handleClickUpdate} />
                <div className="mb-4 mt-4">
                    <label htmlFor="user" className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-gray-300">Grupo</label>
                    <div className="flex space-x-2 ">
                        {newModify === false && (
                            <Image
                                onClick={() => handleClickNew()}
                                className="dark:filter dark:invert dark:opacity-75 opacity-40 
                                filter-none w-auto h-7"
                                src="/add.svg"
                                alt="add"
                                width={28}
                                height={28}

                            />
                        )}{<></>}
                        <input
                            type="text"

                            id="text-grupo"
                            className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 
                                  dark:focus:border-blue-500"
                            placeholder=""
                            {...register("grupo", {
                                required: "Grupo es requerido",
                                maxLength: { value: 5, message: "Grupo no puede tener más de 5 caracteres" },
                                minLength: { value: 1, message: "Grupo no puede estar vacío" }
                            })} />
                    </div>
                    {errors.grupo && (
                        <ErrorMessageInput message={errors.grupo.message + ""} />
                    )}

                </div>
                <button type="submit"
                    className="w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                           dark:focus:ring-blue-800   ">Guardar</button>
            </form>
        </div>

    );
}