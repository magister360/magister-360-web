'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function SectionGGM() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => console.log(data);
    const [dataForm, setDataForm] = useState({
        grado: '',
        grupo: '',
        materia: '',
    });

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto 
            md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 
                        sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
                <form className="max-w-sm mx-auto mt-10 mb-10"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <label htmlFor="small" className="block mb-2 text-sm font-medium text-gray-900
             dark:text-white">Seleccione grado</label>
                        <select id="small" className="block w-full p-2 mb-6 text-sm text-gray-900 
                    border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500 "
                            {...register("grado")} >

                            <option className="" value="1">1</option>
                            <option value="2">2</option>

                        </select>
                    </div>

                    <div>
                        <label htmlFor="small" className="block mb-2 text-sm font-medium text-gray-900
             dark:text-white">Seleccione grupo</label>
                        <select id="small" className="block w-full p-2 mb-6 text-sm text-gray-900 
                    border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500 "
                            {...register("grupo") }>

                            <option id="1" value="A">A</option>
                            <option id="2" value="B">B</option>
                            <option id="3" value="C">C</option>

                        </select>
                    </div>

                    <div>
                        <label htmlFor="small" className="block mb-2 text-sm font-medium text-gray-900
             dark:text-white">Seleccione materia</label>
                        <select id="small" className="block w-full p-2 mb-6 text-sm text-gray-900 
                    border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500 "
                            {...register("materia")}>

                            <option value="1">Matematicas</option>
                            <option value="2">Español</option>

                        </select>
                    </div>
                    <button type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-blue-600 dark:hover:bg-blue-700 
                           dark:focus:ring-blue-800  ">Continuar</button>
                </form>
            </div >
        </div >

    );
}