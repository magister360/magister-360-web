
"use client";

import TableAlumnos from "./components/TableAlumnos";
import { useRouter } from 'next/navigation';




export default function Alumno() {
    const router = useRouter();

    const handleSubmitRouterPdf = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push('alumnos/pdf_codigo_barras')
    }

    const itempNames = [
        { id: 1, noLista: '1', name: 'pedro', apellidoPaterno: 'Martinez', apellidoMaterno: 'Martinez', icon: '/grados.svg', estatus: 0, codigoBarras: '1234567890123' },
        { id: 2, noLista: '2', name: 'Maria', apellidoPaterno: 'Perez', apellidoMaterno: 'Martinez', icon: '/grados.svg', estatus: 1, codigoBarras: '1234567890123' },
        { id: 3, noLista: '2', name: 'Maria', apellidoPaterno: 'Perez', apellidoMaterno: 'Martinez', icon: '/grados.svg', estatus: 2, codigoBarras: '1234567890123' }

    ];
    const data = [
        { noLista: 1, nombre: "Juan", codigoBarras: "1234567890123" },
        { id: 2, noLista: 2, nombre: "María", codigoBarras: "1234567890123" },

    ];

    return (
        <div>
            <TableAlumnos itempNames={itempNames} />
            <div className="mt-4 ml-72">
                <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 
                        sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
                    <form className="max-w-sm mx-auto mt-10 mb-10"
                        onSubmit={handleSubmitRouterPdf}>
                        Visualizar código de barras
                        <button type="submit"
                            className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-blue-600 dark:hover:bg-blue-700 
                           dark:focus:ring-blue-800  ">Visualizar pdf</button>
                    </form>
                </div>
            </div>
        </div>


    );
}