"use client"

import TableMateria from "./components/TableMateria";



export default function Materia() {

    const itempNames = [
        { id: 1, materia: 'Matematicas' },
        { id: 2, materia: 'Agricultura' },
        { id: 2, materia: 'Ciencias politicas' }

    ];

    return (

        <div className="mt-14 ml-72">
            <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 
                        sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
                <form className="max-w-sm mx-auto mt-10 mb-10">
                    <TableMateria itempNames={itempNames} />
                    <div className="mb-4 mt-4">
                        <label htmlFor="user" className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white">Materia</label>
                        <input
                            type="text"
                            name="text"

                            id="text"
                            className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 
                                  dark:focus:border-blue-500"
                            placeholder="" />

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