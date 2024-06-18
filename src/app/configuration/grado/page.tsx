"use client"

import ErrorMessageInput from "@/app/components/ErrorMessageInput";
import TableGrado, { ItemGrado, getIdGrado, getStrGrado } from "./components/TablaGrado";
import { useForm } from "react-hook-form";
import { createGrado, getGrados, removeGrado, updateGrado } from "./controller/GradoController";
import { useEffect, useState } from "react";
import { loadSessionFromLocalStorage } from "@/app/sesions/SesionCookies";
import { useRouter } from 'next/navigation';
import { TypeStatusGrado } from "@/app/utils/TypeStatusGrado";
import Image from 'next/image';


export default function Grado() {
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
            router.refresh()
            router.push('/login')
        } else {
            const userId = sesionLocalStorage?.id ?? -1;
            if (newModify) {
                const save = await createGrado(
                    userId,
                    data.grado,
                    TypeStatusGrado.ALTA
                );
                if (save === true) {
                    fetchGrados();
                    alert('El grado se guardo con éxito')
                    reset()
                } else {

                    alert('Error al guardar')
                    reset()
                }
            } else {
                const save = await updateGrado(
                    idSelect,
                    data.grado
                );
                if (save === true) {
                    fetchGrados();
                    alert('El grado se modifico con éxito')
                    reset()
                } else {
                    alert('Error al guardar')
                    reset()
                }
                handleClickNew()
            }
        }

    }



    const fetchGrados = async () => {
        const sesionLocalStorage = loadSessionFromLocalStorage();
        if (!sesionLocalStorage) {
            router.push('/login');
            return;
        }
        const userId = sesionLocalStorage?.id ?? -1;
        const grados = await getGrados(
            userId,
            TypeStatusGrado.ALTA);
        if (grados) {

            setItems(grados);
        }
    };


    useEffect(() => {
        fetchGrados();
    }, []);

    const handleClickRemove = async (items: ItemGrado[], index: number) => {
        const confirmar = window.confirm("¿Está seguro de eliminar la grado?");
        if (confirmar) {
            const id = getIdGrado(items = items, index);

            const remove = await removeGrado(id, TypeStatusGrado.REMOVE);
            if (remove) {
                await fetchGrados();
            } else {
                alert('Error no es posible eliminar')
            }
            handleClickNew();
        }
    };

    const handleClickUpdate = async (items: ItemGrado[], index: number) => {

        const id = getIdGrado(items = items, index);
        const value = getStrGrado(items = items, index)
        setIdSelect(id)
        setValue('grado', value)
        setNewModify(false)
    };

    const handleClickNew = () => {
        setIdSelect(-1)
        reset()
        setNewModify(true)
    };

    return (

        <div className="ml-72 md:mt-14  rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff] p-5">
            <form className=" "
                onSubmit={
                    handleSubmit(onSubmit)
                }>
                <TableGrado items={items}
                    handleClickRemove={handleClickRemove}
                    handleClickUpdate={handleClickUpdate} />
                <div className="mb-4 mt-4">
                    <label htmlFor="user" className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-gray-300">Grado</label>
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
                            id="text-grado"
                            className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 
                                  dark:focus:border-blue-500"
                            placeholder=""
                            {...register("grado", {
                                required: "Grado es requerido",
                                maxLength: { value: 5, message: "Grado no puede tener más de 5 caracteres" },
                                minLength: { value: 1, message: "Grado no puede estar vacío" }
                            })}
                        />
                    </div>
                    {errors.grado && (
                        <ErrorMessageInput message={errors.grado.message + ""} />
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