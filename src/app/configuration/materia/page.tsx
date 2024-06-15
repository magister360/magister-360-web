"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TableMateria, { ItemMateria, getIdMateria, getStrMateria } from "./components/TableMateria";
import { useRouter } from 'next/navigation';
import { loadSessionFromLocalStorage } from "@/app/sesions/SesionCookies";
import { createMateria, getMaterias, removeMateria, updateMateria } from "./controller/MateriaController";
import ErrorMessageInput from "@/app/components/ErrorMessageInput";
import { TypeStatusMateria } from "@/app/utils/TypeStatusMateria";
import Image from 'next/image';

export default function Materia() {

    const router = useRouter();
    const [items, setItems] = useState([]);
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
            router.refresh()
            router.push('/login')
        } else {
            const userId = sesionLocalStorage?.id ?? -1;
            if (newModify) {
                const save = await createMateria(
                    userId,
                    data.materia,
                    TypeStatusMateria.ALTA
                );
                if (save === true) {
                    fetchMaterias();
                    alert('La materia se guardo con éxito')
                    reset()
                } else {
                    alert('Error al guardar')
                    reset()
                }
            } else {
                const save = await updateMateria(
                    idSelect,
                    data.materia
                );
                if (save === true) {
                    fetchMaterias();
                    alert('La materia se modifico con éxito')
                    reset()
                } else {
                    alert('Error al guardar')
                    reset()
                }
                handleClickNew()
            }
        }

    }

    const fetchMaterias = async () => {
        const sesionLocalStorage = loadSessionFromLocalStorage();
        if (!sesionLocalStorage) {
            router.push('/login');
            return;
        }
        const userId = sesionLocalStorage?.id ?? -1;
        const grados = await getMaterias(
            userId,
            TypeStatusMateria.ALTA);
        if (grados) {
            setItems(grados);
        }

    };


    useEffect(() => {
        fetchMaterias();
    }, [router]);


    const handleClickRemove = async (items: ItemMateria[], index: number) => {
        const confirmar = window.confirm("¿Está seguro de eliminar la materia?");
        if (confirmar) {
            const id = getIdMateria(items = items, index);

            const remove = await removeMateria(id, TypeStatusMateria.REMOVE);
            if (remove) {
                await fetchMaterias();
            } else {
                alert('Error no es posible eliminar')
            }
            handleClickNew(); 
        }
        
    };

    const handleClickUpdate = async (items: ItemMateria[], index: number) => {

        const id = getIdMateria(items = items, index);
        const value = getStrMateria(items = items, index)
        setIdSelect(id)
        setValue('materia', value)
        setNewModify(false)
    };

    const handleClickNew =  () => {
        setIdSelect(-1)
        reset()
        setNewModify(true)
    };

    return (


        <div className="ml-72 md:mt-14 pt-2 pb-2 rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]">
            <form className="max-w-sm mx-auto mt-10 mb-10"
                onSubmit={
                    handleSubmit(onSubmit)
                }>
                <TableMateria items={items}
                    handleClickRemove={handleClickRemove}
                    handleClickUpdate={handleClickUpdate} />
                <div className="mb-4 mt-4">
                    <label htmlFor="user" className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-gray-300">Materia</label>
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
                            id="text-materia"
                            className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 
                                  dark:focus:border-blue-500"
                            placeholder=""  {...register("materia", {
                                required: "Materia es requerido",
                                maxLength: { value: 60, message: "Materia no puede tener más de 5 caracteres" },
                                minLength: { value: 1, message: "Materia no puede estar vacío" }
                            })}
                        />
                    </div>
                    {errors.materia && (
                        <ErrorMessageInput message={errors.materia.message + ""} />
                    )}

                </div>
                <button type="submit"
                    className="w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                           dark:focus:ring-blue-800  ">Guardar</button>
            </form>
        </div>


    );
}